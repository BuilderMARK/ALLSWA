import { ref, provide,reactive } from 'vue';

export async function handleCreate() {
    console.log("handleCreate");
    try {
      const response = await createUserApi({ username: LoginState.email, password: LoginState.password });
      console.log(response);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }

export function provideLoginState(){
    provide('LoginState',LoginState)
}

  const LoginState = reactive({
    username: '',
    email: '',
    password: '',
    id: 0,
    token: '',
    highScore: 0,
    isLogin: false,
    loginError: '',
  });
  
   export async function handleLogin() {
    console.log("handleLogin");
    console.log(LoginState);
    try {
      const response = await loginUserApi({ username: LoginState.email, password: LoginState.password });
      LoginState.isLogin = true;
      LoginState.token = response.token;
      LoginState.id = response.userId;
      console.log(LoginState);
    } catch (error) {
      console.error("Error logging in:", error);
      LoginState.loginError = "Login failed";
    }
  }