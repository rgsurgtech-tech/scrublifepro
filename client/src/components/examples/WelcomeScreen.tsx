import WelcomeScreen from '../WelcomeScreen';

export default function WelcomeScreenExample() {
  return (
    <WelcomeScreen 
      onGetStarted={() => console.log('Get started clicked')}
      onLogin={() => console.log('Login clicked')}
    />
  );
}