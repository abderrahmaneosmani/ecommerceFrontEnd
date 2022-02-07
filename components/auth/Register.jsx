import { Form, Input, Button, Checkbox, message } from "antd";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signWithGoogle } from "../../features/firebase/firebase-reducer";
import { useCreateUserMutation } from "../../features/users/user-api-slice";
import { isUserAuthenticatedSelector } from "../../features/auth/auth";
import { loginPopUp } from "../../features/auth/auth-slice";
import { useSelector } from "../../app/store";
import { singWithPopup } from "../../features/firebase/firebase-reducer";

const Register = () => {
  const router = useRouter();
  const authenticated = useSelector(isUserAuthenticatedSelector);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [createUser] = useCreateUserMutation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    const { username, email, password } = values;
    const user = {
      username,
      email,
      password,
    };

    try {
      const c = await createUser(user);
      console.log(c);

      router.push("/auth/login");
    } catch (error) {
      signWithGoogle();

      message.error("un authorized user .....");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const withPopup = () => {
    const userData = {
      displayName: null,
      email: null,
    };
    dispatch(loginPopUp(userData));
    if (authenticated) {
      router.push("/");
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          SignUp
        </Button>

        <Button onClick={withPopup}>With google</Button>
      </Form.Item>
    </Form>
  );
};
export default Register;
