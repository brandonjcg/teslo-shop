import { monsserat } from '@/fonts';
import { RegisterForm } from './components';

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${monsserat.className} text-4xl mb-5`}>New account</h1>

      <RegisterForm />
    </div>
  );
}
