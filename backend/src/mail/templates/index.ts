import { emailSubjects } from '../../consts/emailSubjects';

export const templatesList = {
  [emailSubjects.RESET_PASSWORD]: {
    en: { subject: 'Reset password', template: 'en/resetPassword.pug' },
    uk: { subject: 'Скидання пароля', template: 'uk/resetPassword.pug' },
  },
};
