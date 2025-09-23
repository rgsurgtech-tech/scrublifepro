import LoginForm from '../LoginForm';

export default function LoginFormExample() {
  return (
    <LoginForm 
      onBack={() => console.log('Back clicked')}
      onSuccess={() => console.log('Login success')}
    />
  );
}