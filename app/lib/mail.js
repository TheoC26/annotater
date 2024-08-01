"use server";
import nodemailer from "nodemailer";

export async function sendMail({ to, name, subject, body }) {
  const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
  const SMTP_EMAIL = process.env.SMTP_EMAIL;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
    console.log("test result", testResult);
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const result = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log("result", result);
  } catch (error) {
    console.log(error);
  }
}

// export async function sendShareEmail() {
//   await sendMail({
//     to: "theo.htf.chan@gmail.com",
//     name: "Theo",
//     subject: "Test Annotater Mail",
//     body: `<>
//     <h1>Test Annotater Mail</h1>
//       </>`,
//   });
// }

export async function sendShareEmail(
  to,
  name,
  senderEmail,
  sourceID,
  sourceTitle
) {
  const body = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        @media (max-width:520px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .mobile_hide {
                display: none;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
</head>

<body class="body" style="background-color: #F8F8F8; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #F8F8F8;">
        <tbody>
            <tr>
                <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color: #000000; width: 500px; margin: 0 auto;" width="500">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%" style="font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="heading_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
                                                        <tr>
                                                            <td class="pad">
                                                                <h1 style="margin: 0; color: #b4aadc; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0;"><span>${name} shared a source on Notator</span></h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                        <tr>
                                                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #dddddd;"><span>&#8202;</span></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="color:#101112;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:800;letter-spacing:0px;line-height:120%;text-align:left;">
                                                                    <p style="margin: 0;">${name} (${senderEmail}) has invited you to view the following document:</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="heading_block block-4" width="100%" border="0" cellpadding="25" cellspacing="0" role="presentation">
                                                        <tr>
                                                            <td class="pad">
                                                                <h1 style="margin: 0; color: #b4aadc; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 32px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>${sourceTitle}</span></h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="button_block block-5" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <a href="https://www.notator.app/sources/source/${sourceID}" target="_blank" style="background-color:#c6bcef;border-bottom:1px solid transparent;border-left:1px solid transparent;border-radius:13px;border-right:1px solid transparent;border-top:1px solid transparent;color:#ffffff;display:inline-block;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;font-weight:700;padding-bottom:5px;padding-top:5px;text-align:center;text-decoration:none;width:auto;"><span style="padding-left:20px;padding-right:20px;font-size:16px;display:inline-block;line-height: 32px;">View the source!</span></a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #F8F8F8;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px; margin: 0 auto;" width="500">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="html_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;" align="center"><div style="height:30px;">&nbsp;</div></div>
															</td>
														</tr>
													</table>
													<table class="social_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="text-align:center;padding-right:0px;padding-left:0px;">
																<div class="alignment" align="center">
																	<table class="social-table" width="141px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
																		<tr>
																			<td style="padding:0 15px 0 0px;"><a href="https://twitter.com/notator" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-default-gray/twitter@2x.png" width="32" height="auto" alt="Twitter" title="Twitter" style="display: block; height: auto; border: 0;"></a></td>
																			<td style="padding:0 15px 0 0px;"><a href="https://www.instagram.com/notator" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-default-gray/instagram@2x.png" width="32" height="auto" alt="Instagram" title="Instagram" style="display: block; height: auto; border: 0;"></a></td>
																			<td style="padding:0 15px 0 0px;"><a href="https://www.tiktok.com/@notator" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-default-gray/tiktok@2x.png" width="32" height="auto" alt="TikTok" title="TikTok" style="display: block; height: auto; border: 0;"></a></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="html_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;" align="center"><div style="margin-top: 40px;border-top:1px dashed #D6D6D6;margin-bottom: 40px;"></div></div>
															</td>
														</tr>
													</table>
													<table class="text_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="font-family: sans-serif">
																	<div class style="font-size: 12px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; mso-line-height-alt: 14.399999999999999px; color: #C0C0C0; line-height: 1.2;">
																		<p style="margin: 0; font-size: 12px; text-align: center; mso-line-height-alt: 14.399999999999999px;"><span style="color:#C0C0C0;">Copyright © 2024 Notator, All rights reserved.<br></span></p>
																	</div>
																</div>
															</td>
														</tr>
													</table>
													<table class="html_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div style="font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:center;" align="center"><div style="height-top: 20px;">&nbsp;</div></div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
</body>

</html>
`;

  await sendMail({
    to: to,
    name: name,
    subject: "Notator note shared with you: " + sourceTitle,
    body: body,
  });
}
