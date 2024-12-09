import { useFormStatus } from 'react-dom';
import clsx from 'clsx';

export const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending,
      })}
      disabled={pending}
    >
      Login
    </button>
  );
};
