export function userVerifyHTML(token) {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto;">
  <tr>
    <td style="border-radius: 5px; background-color: #007BFF; text-align: center;">
      <a href="http://localhost:3000/users/verification/${token}" target="_blank" style="font-size: 16px; font-family: Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 12px 24px; display: inline-block; border-radius: 5px;">
        Click Me
      </a>
    </td>
  </tr>
</table>`;
}

export function forgotPasswordHTML(token) {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: auto;">
  <tr>
    <td style="border-radius: 5px; background-color: #007BFF; text-align: center;">
      <a href="http://localhost:3000/users/change-password-form/${token}" target="_blank" style="font-size: 16px; font-family: Arial, sans-serif; color: #ffffff; text-decoration: none; padding: 12px 24px; display: inline-block; border-radius: 5px;">
        Change password
      </a>
    </td>
  </tr>
</table>`;
}
