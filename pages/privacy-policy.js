import { NextSeo } from "next-seo";
import React from "react";

import ArticleSection from "../core/components/pages/Article/components/ArticleSection";
import ArticleWrapper from "../core/components/pages/Article/components/ArticleWrapper";
import Email from "../core/components/vignettes/Email";
import HeaderLarge from "../core/components/vignettes/HeaderLarge";
import Link from "../core/components/controls/Link";
import Main from "../core/components/layouts/Main";

export default () => {
  const seo = {
    title: "Privacy Policy",
  };

  return (
    <>
      <NextSeo title={seo.title} />
      <Main>
        <ArticleWrapper>
          <HeaderLarge pageTitle={seo.title} />
          <ArticleSection>
            <p>
              Analog.Cafe does not share or sell your private information (such
              as e-mail) to anyone outside of editing and admin staff at
              Analog.Cafe. Your email will be used for communication regarding
              your work and occasional or scheduled company newsletters. If you
              are a part of an email list, you can easily unsubscribe at any
              time via link in the footer of the email. Being a part of the
              email list is not the same as having an account with Analog.Cafe.
              Some emails are a part of the system (like notificatons sent at
              the time of publication to all authors). Those emails can can only
              be unsubscribed from when you delete your account from Analog.Cafe
              servers.
            </p>
            <p>
              You can delete your account at any time by sending a request to
              this <Email />. Analog.Cafe will comply with your request within a
              week. If you want your work to be removed from Analog.Cafe
              website, please send a separate request.
            </p>
            <p>
              If you are logged in to an account with Analog.Cafe, a token is
              stored on your device that verifies your identity to the server.
              It is not used to track your behaviour. Additionally (regardless
              of whether you have an account or not, logged in or not),
              Analog.Cafe may store textual data in a variety of forms on your
              device that lets you store your submissions in your browser and
              resume them even when you are offline, as well as to provide
              customized experiences. Analog.Cafe does not use that information
              to track and/or record your behaviour. Analog.Cafe can not see the
              content of your token or any of the stored data mentioned above.
              Analog.Cafe does not directly use cookie-tracking technology. An
              instance of Google Analytics and FullStory softwares <em>is</em>{" "}
              installed on Analog.Cafe, which employs cookies, however, they are
              not shared with any outside domain.
            </p>
            <p>
              Analog.Cafe uses Google Analytics and FullStory, which anonymously
              track your browsing behaviour and adhere their own privacy
              policies. If you would like to opt out of Google Analytics and/or
              FullStory tracking, please visit{" "}
              <strong>
                <Link to="/privacy-settings">Privacy Settings</Link>
              </strong>{" "}
              and follow the instructions there. We use Cloudinary to deliver
              high-quality images who acts according to their own{" "}
              <Link to="https://cloudinary.com/privacy">privacy policy</Link>.
            </p>
            <p>
              This online privacy policy applies only to information collected
              through the website or app and not to information collected
              elsewhere. By using Analog.Cafe, you consent to this
              website&rsquo;s privacy policy. This policy might be updated
              without notice; all changes would be posted on this page. This
              policy was last modified on June 14, 2018.
            </p>
            <h3>Analog.Cafe Accounts Consents.</h3>
            <p>
              You are consenting to being identified by any of the above
              technologies as an individual anonymous user when you sign up for
              Analog.Cafe account. You are also consenting to having personally
              identifiable information attached to your account, securely stored
              and accessible to admin and the software, when you use Analog.Cafe
              account. You may choose to share your private information as part
              of your public profile (see below), however, it is not required
              and you can easily remove any personally identifiable information
              from your public account using profile editor tool.
            </p>
            <p>
              By creating and using Analog.Cafe account you also consent to
              making a public account with your infomation, accessible by search
              engines. This account can be automatically created for you from
              your social login data (your image, name, and short bio). You can
              easily edit that information at any time.
            </p>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};
