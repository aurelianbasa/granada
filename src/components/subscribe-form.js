import * as React from 'react';
import { RiRefreshLine, RiCheckFill } from 'react-icons/ri';
import { useTranslation } from 'gatsby-plugin-react-i18next';

export default function SubscribeForm() {
  const { t } = useTranslation();

  const [message, setMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    formData.append('form-name', 'Subscribe');

    try {
      const formId = process.env.GATSBY_FORMSPREE_SUBSCRIBE_ID;
      if (!formId) throw new Error('GATSBY_FORMSPREE_SUBSCRIBE_ID is not set');

      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (response.status === 200) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }

      setMessage(response.msg);
    } catch (error) {
      setMessage('Something went wrong!');
      setIsSuccess(false);
    }

    setIsSubmitting(false);
  };

  return (
    <div className='grid max-w-[400px] gap-4 text-center lg:text-left'>
      <p>{t('footer.subscribeText')}</p>

      <form className='relative flex rounded-xl border border-secondary p-[3px]' onSubmit={handleSubmit}>
        <input
          className='h-14 w-full rounded-lg bg-transparent pl-4 pr-40 text-secondary outline-none placeholder:text-tertiary'
          required
          type='email'
          name='email'
          placeholder={t('footer.subscribePlaceholder')}
        />

        <button
          className={`absolute right-[3px] flex h-14 min-w-36 items-center justify-center gap-2 rounded-lg bg-primary text-white ${
            isSubmitting || isSuccess ? 'pointer-events-none' : 'hover:bg-black'
          }`}
          type='submit'
        >
          {!isSubmitting && !isSuccess && <>{t('footer.subscribeButton')}</>}
          {isSubmitting && <RiRefreshLine className='size-5 animate-spin' />}
          {isSuccess && <RiCheckFill className='size-5' />}
        </button>
      </form>

      {message && !isSuccess && <div className='text-center text-sm text-primary'>{message}</div>}
    </div>
  );
}
