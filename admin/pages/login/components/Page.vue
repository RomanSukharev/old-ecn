<script setup lang="ts">
import { object, string } from "yup";
import { useLoginMutation } from "~/shared/api/generated";

const { handleSubmit, errors, defineField } = useForm({
  validateOnMount: false,
  validationSchema: toTypedSchema(
    object({
      email: string()
        .required("Заполните это поле")
        .email("Неверный формат E-mail")
        .default(""),
      password: string()
        .required("Заполните это поле")
        .min(4, "Введите не менее 4 символов")
        .max(32, "Введите не более 32 символов")
        .default(""),
    }),
  ),
});

const [email] = defineField("email");
const [password] = defineField("password");

const router = useRouter();

const onLogin = handleSubmit(async (values) => {
  try {
    const { mutate } = useLoginMutation();
    const result = await mutate({
      email: values.email,
      password: values.password,
    });

    if (result?.data) {
      localStorage.setItem("token", result.data.login.token);
      const returnUrl = localStorage.getItem("returnUrl");
      router.replace(returnUrl || "/");
      const me = result.data.login.me;
      useState("me", () => me);
      localStorage.removeItem("returnUrl");
    }
  } catch (err) {
    alert("Ошибка: не удалось войти в систему.");
  }
});
</script>

<template>
  <div
    class="flex flex-col p-10 items-center justify-center w-[400px] bg-white shadow-xl"
  >
    <div class="mb-7"><i-logo /></div>

    <form class="w-full flex flex-col items-center justify-center">
      <ECNFormInput
        v-model="email"
        class="mb-4"
        label="Email"
        placeholder="Укажите E-mail"
        required
        :inline="false"
        :error="errors.email"
      />

      <ECNFormInput
        v-model="password"
        class="mb-8"
        label="Пароль"
        placeholder="Укажите пароль"
        required
        type="password"
        :inline="false"
        :error="errors.password"
        @enter="onLogin"
      />

      <ECNButton class="w-full" @click="onLogin">
        <div class="grow text-center">Войти</div>
      </ECNButton>
    </form>
  </div>
</template>
