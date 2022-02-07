import { Form, Input, Button, Checkbox } from "antd";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { isUserAuthenticatedSelector } from "../../features/auth/auth";
import { loginPopUp, signIn } from "../../features/auth/auth-slice";

const Login = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(isUserAuthenticatedSelector);
  const router = useRouter();

  const onFinish = (values: any) => {
    const { username, password } = values;
    const user = { username, password };

    const response: any = dispatch(signIn(user));
    if (authenticated) {
      router.push("/");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const withPopup = async () => {
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
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>

        <button onClick={withPopup} type="button">
          Google
        </button>
      </Form.Item>
    </Form>
  );
};

export default Login;
