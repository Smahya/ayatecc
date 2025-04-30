"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SelectComponent } from "@/components/Select";
import axios from "axios";

export default function Register() {
  const schema = z.object({
    email: z.string().email(),
    phone: z.string().min(10),
    amount: z.number().min(1),
  });

  const { register, handleSubmit, formState, setValue } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
  });

  const initializePayment = async (email: string, amount: number) => {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount,
        callback_url: `${window.location.origin}/payment/verify`,
        metadata: {
          custom_fields: [
            {
              display_name: "Payment For",
              variable_name: "payment_for",
              value: "Registration",
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
  };

  function openPaystack(url: string) {
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.target = "_blank";
    aTag.click();
  }

  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: async (payload: {
      email: string;
      phone: string;
      amount: number;
    }) => {
      return await initializePayment(payload.email, payload.amount);
    },
    onSuccess: (response) => {
      const { authorization_url } = response.data.data;
      openPaystack(authorization_url);
    },
    onError: () => {
      console.log("Paystack could not be initialized");
    },
  });

  const onSubmit = handleSubmit((data) => {
    registerMutation(data);
  });

  return (
    <div className="grid gap-4 relative sm:p-10 p-4">
      <div className="grid gap-2">
        <Text variant="h1" className="text-center">
          Make Payment
        </Text>
        <Text variant="body2" className="text-center">
          Make payment for your preferred package
        </Text>
      </div>

      <form className="grid gap-4" onSubmit={onSubmit}>
        <Input
          label="Phone Number"
          placeholder="Phone Number"
          {...register("phone")}
          error={formState.errors.phone?.message}
        />
        <Input
          label="Email Address"
          placeholder="Email Address"
          {...register("email")}
          error={formState.errors.email?.message}
        />
        <SelectComponent
          options={["1", "2", "3"]}
          label="Select Package"
          onChange={(value) => setValue("amount", parseInt(value.target.value))}
        />

        <Button
          block
          type="submit"
          disabled={isPending}
          loading={isPending}
          className="my-8"
        >
          Continue
        </Button>

        <div className="flex items-center justify-center gap-1.5 bg-neutral-50 absolute bottom-0 left-0 right-0 py-2">
          <Text
            variant="body2"
            className="text-center text-neutral-600 dark:text-neutral-300"
          >
            For enquiries, contact us on{" "}
            <span className="text-neutral-950 dark:text-white font-semibold cursor-pointer text-sm leading-[120%] tracking-[-0.2px]">
              0202020202
            </span>
          </Text>
        </div>
      </form>
    </div>
  );
}
