import { validUsername } from '@/utils/validate'
export function regVerifyRule(elementUIVerify) {
  // 添加用户名验证规则
  elementUIVerify.addRule('username', () => [
    {
      validator(rule, val, callback) {
        console.log(rule)
        if (!validUsername(val)) {
          callback(new Error(elementUIVerify.getErrorMessage('userName')))
        } else {
          callback()
        }
      }
    }
  ])
  // 添加登录密码验证规则
  elementUIVerify.addRule('loginpwd', (pwdminlen) => [
    {
      validator(rule, val, callback) {
        if (val.length < pwdminlen) {
          callback(new Error(elementUIVerify.getErrorMessage('password', pwdminlen)))
        } else {
          callback()
        }
      }
    }
  ])
}

export const elementUIVerifyErrorMessageTemplate = {
  empty: '请补充该项内容',
  length: '请输入{length}位字符',
  minLength: '输入内容至少{minLength}位',
  number: '请输入数字',
  int: '请输入整数',
  lt: '输入数字应小于{lt}',
  lte: '输入数字不能大于{lte}',
  gt: '输入数字应大于{gt}',
  gte: '输入数字不能小于{gte}',
  maxDecimalLength: '该输入项最多接受{maxDecimalLength}位小数',
  phone: '请输入正确的手机号',
  email: '请输入正确的邮箱',
  verifyCode: '请输入正确的验证码',
  userName: '请输入正确的用户名',
  password: '密码不能少于{password}位数'
}
