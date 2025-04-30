"use server";

import { queryResponse } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/server";

export async function login(payload: { email: string; password: string }) {
  const supabase = await createClient();

  const response = await supabase.auth.signInWithPassword(payload);
  return queryResponse(response);
}

export async function resetEmailVerification(email: string) {
  const supabase = await createClient();
  const response = await supabase.auth.resend({
    type: "signup",
    email,
  });
  return queryResponse(response);
}

export async function registerUser(payload: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();
  const response = await supabase.auth.signUp(payload);
  return queryResponse(response);
}

export async function loginWithGoogle() {
  const supabase = await createClient();
  const response = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  return queryResponse(response);
}

//     type: "signup",
//     email: getValues("email"),
//   });
//   console.log("data", data);
//   console.log("error", error);
// }

// const { mutate: login, isPending } = useMutation({
//   mutationFn: async (payload: { email: string; password: string }) => {
//     const supabase = await createClient();

//     const response = await supabase.auth.signInWithPassword(payload);
//     return queryResponse(response);
//   },
//   onSuccess: () => {
//     toast.success("Login successful");
//     router.push("/");
//   },
//   onError: (err: AuthApiError) => {
//     const action =
//       err.code === "email_not_confirmed" ? (
//         <Button variant="link" onClick={resetEmailVerification}>
//           Resend email
//         </Button>
//       ) : null;
//     toast.error("Login failed", action);
//   },
// });
