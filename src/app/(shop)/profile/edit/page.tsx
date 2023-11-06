import PasswordChangeForm from './components/passwordChangeForm'
import UserEditForm from './components/userEditForm'

export const metadata = {
   title: 'اکسپرسیفای | اطلاعات حساب',
}

const Edit = () => {
   return (
      <div className='max-w-md mx-6 md:mx-auto'>
         <div className='my-16 from-gray-100 to-gray-200 bg-gradient-to-bl rounded-lg px-5 pt-5 space-y-11'>
            <h1 className='text-center font-bold'>اطلاعات حساب</h1>
            <UserEditForm />
         </div>
         <div className='my-16 from-gray-100 to-gray-200 bg-gradient-to-bl rounded-lg px-5 pt-5 space-y-11'>
            <h1 className='text-center font-bold'>تغییر رمز عبور</h1>
            <PasswordChangeForm />
         </div>
      </div>
   )
}

export default Edit
