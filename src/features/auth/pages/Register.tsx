"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PACKAGES, type Pkg } from "@/lib/packages";

const schema = z.object({
  email: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  phone: z.string().min(10, "Enter a 10-digit number"),
  amount: z.number().min(1, "Choose a package"),
});

type FormValues = z.infer<typeof schema>;

export default function Register() {
  const [selectedId, setSelectedId] = useState<string>("standard");

  const { register, handleSubmit, formState, setValue } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: PACKAGES.find((p) => p.id === "standard")!.amountGhs,
    },
  });

  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: async (payload: FormValues) => {
      const { data } = await axios.post<{
        authorization_url: string;
        access_code: string;
        reference: string;
      }>("/api/payment/initialize", payload);
      return data;
    },
    onSuccess: async ({ access_code, reference }) => {
      const { default: PaystackPop } = await import("@paystack/inline-js");
      const popup = new PaystackPop();
      // The lib's runtime accepts (accessCode, { onSuccess, onCancel, onError })
      // but the bundled .d.ts only declares one arg. Bypass the stale types.
      (
        popup.resumeTransaction as unknown as (
          accessCode: string,
          handlers: {
            onSuccess?: (tx: { reference: string }) => void;
            onCancel?: () => void;
            onError?: (err: unknown) => void;
          }
        ) => void
      )(access_code, {
        onSuccess: (tx) => {
          window.location.href = `/payment/verify?reference=${
            tx?.reference || reference
          }`;
        },
        onCancel: () => {
          // Modal closed without paying — stay on the form
        },
        onError: () => {
          window.location.href = "/payment/failed";
        },
      });
    },
    onError: () => {
      console.error("Payment could not be initialized");
    },
  });

  const onSubmit = handleSubmit((data) => registerMutation(data));

  const handleSelect = (pkg: Pkg) => {
    setSelectedId(pkg.id);
    setValue("amount", pkg.amountGhs, { shouldValidate: true });
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Buy a voucher
        </h1>
        <p className="text-sm text-ink-60">
          Choose a bundle and we&apos;ll send the code to you.
        </p>
      </div>

      <form className="grid gap-6" onSubmit={onSubmit} noValidate>
        <fieldset className="grid gap-2">
          <legend className="mb-1 text-sm font-medium text-ink">
            Package
          </legend>
          <div className="-mx-7 sm:-mx-9 px-7 sm:px-9 overflow-x-auto no-scrollbar">
            <div className="flex gap-2 snap-x snap-mandatory">
              {PACKAGES.map((pkg) => {
                const active = selectedId === pkg.id;
                return (
                  <button
                    type="button"
                    key={pkg.id}
                    onClick={() => handleSelect(pkg)}
                    aria-pressed={active}
                    className={cn(
                      "relative text-left rounded-lg border px-3 py-3 transition-[border-color] duration-150 snap-start flex-none w-[120px]",
                      "focus:outline-none",
                      active
                        ? "border-ink bg-ink text-paper"
                        : "border-mute-line bg-paper text-ink hover:border-ink/40"
                    )}
                  >
                    <div className="flex items-baseline gap-1">
                      <span
                        className={cn(
                          "text-[11px] font-medium",
                          active ? "text-paper/70" : "text-mute"
                        )}
                      >
                        GH₵
                      </span>
                      <span className="text-xl font-semibold tabular leading-none">
                        {pkg.amountGhs}
                      </span>
                    </div>
                    <div className="mt-2.5 grid gap-0.5">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          active ? "text-paper" : "text-ink"
                        )}
                      >
                        {pkg.data}
                      </span>
                      <span
                        className={cn(
                          "text-[11px]",
                          active ? "text-paper/60" : "text-mute"
                        )}
                      >
                        {pkg.validity}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          {formState.errors.amount && (
            <p className="text-xs text-danger">
              {formState.errors.amount.message}
            </p>
          )}
        </fieldset>

        <div className="grid gap-4">
          <Input
            label="Phone number"
            placeholder="024 000 0000"
            inputMode="tel"
            {...register("phone")}
            error={formState.errors.phone?.message}
          />
          <Input
            label="Email address (optional)"
            placeholder="you@example.com"
            inputMode="email"
            {...register("email")}
            error={formState.errors.email?.message}
          />
        </div>

        <div className="grid gap-2 pt-1">
          <Button
            block
            type="submit"
            disabled={isPending}
            loading={isPending}
            className="h-11"
          >
            {isPending ? "Initializing" : "Continue to payment"}
          </Button>
          <p className="text-center text-xs text-mute">
            Secure payment powered by Paystack
          </p>
        </div>
      </form>
    </div>
  );
}
