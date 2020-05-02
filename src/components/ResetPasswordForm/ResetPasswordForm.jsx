import { observer, useLocalStore } from 'mobx-react'
import React, { useCallback, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import ForgotPasswordStore from 'stores/ForgotPasswordStore'
import { useTranslation } from 'react-i18next'
import Input from 'components/commons/Input'
import UserContext from 'Context/UserContext'
import Button from 'components/commons/Button'
import styles from './resetPasswordForm.scss'

const ResetPasswordForm = () => {
  const forgotPasswordStore = useLocalStore(() => new ForgotPasswordStore())
  const history = useHistory()
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const { token, _id } = useParams()

  const { t } = useTranslation('forgotPassword')

  const goToLogin = useCallback(() => {
    history.push('/')
    history.push('/login')
  })

  const handleChangePassword = useCallback(e => {
    forgotPasswordStore.setPassword(e.target.value)
  })

  const handleChangeRepeatPassword = useCallback(e => {
    forgotPasswordStore.setConfirmPassword(e.target.value)
  })

  const SubmitResetPassword = useCallback(() => {
    forgotPasswordStore.resetPassword(token, authStore.user)
  })

  return (
    <div className={styles.centerForgotPassword}>
      <div className={styles.title}>{t('resetPassword')}</div>
      <div className={styles.inputForm}>
        {forgotPasswordStore.passwordError && (
          <div className={styles.successPassword}>{t('successPassword')}</div>
        )}
        <div className={styles.inputForm}>
          <Input
            type="password"
            handleChange={handleChangePassword}
            isEdit
            canEdit
            placeholder={t('resetPassword')}
          />
        </div>
        {forgotPasswordStore.passwordError && (
          <div className={styles.error}>{t('errorPassword')}</div>
        )}
        <div className={styles.inputForm}>
          <Input
            type="password"
            handleChange={handleChangeRepeatPassword}
            isEdit
            canEdit
            placeholder={t('repeatPassword')}
          />
        </div>
      </div>
      <div className={styles.buttonForgotPassword}>
        <Button handleClick={SubmitResetPassword} bigButton text={t('reset')} />
      </div>
      <div className={styles.forgotPassword}>
        <div onClick={goToLogin} className={styles.textSingIn}>
          {t('login')}
        </div>
      </div>
    </div>
  )
}

export default observer(ResetPasswordForm)
