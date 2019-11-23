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
    title: "Cookie Policy",
  };

  return (
    <>
      <NextSeo title={seo.title} />
      <Main>
        <ArticleWrapper>
          <HeaderLarge pageTitle={seo.title} />
          <ArticleSection>
            <p>
              This cookie policy (&quot;Policy&quot;) describes what cookies are
              and how Website Operator (&quot;Website Operator&quot;,
              &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) uses them on
              the{" "}
              <a target="_blank" rel="nofollow" href="https://www.analog.cafe">
                analog.cafe
              </a>{" "}
              website and any of its products or services (collectively,
              &quot;Website&quot; or &quot;Services&quot;).
            </p>
            <p>
              You should read this Policy so you can understand what type of
              cookies we use, the information we collect using cookies and how
              that information is used. It also describes the choices available
              to you regarding accepting or declining the use of cookies. For
              further information on how we use, store and keep your personal
              data secure, see our{" "}
              <a
                target="_blank"
                rel="nofollow"
                href="https://www.analog.cafe/privacy-policy"
              >
                Privacy Policy
              </a>
              .
            </p>
            <h2>What are cookies?</h2>
            <p>
              Cookies are small pieces of data stored in text files that are
              saved on your computer or other devices when websites are loaded
              in a browser. They are widely used to remember you and your
              preferences, either for a single visit (through a &quot;session
              cookie&quot;) or for multiple repeat visits (using a
              &quot;persistent cookie&quot;).
            </p>
            <p>
              Session cookies are temporary cookies that are used during the
              course of your visit to the Website, and they expire when you
              close the web browser.
            </p>
            <p>
              Persistent cookies are used to remember your preferences within
              our Website and remain on your desktop or mobile device even after
              you close your browser or restart your computer. They ensure a
              consistent and efficient experience for you while visiting our
              Website or using our Services.
            </p>
            <p>
              Cookies may be set by the Website (&quot;first-party
              cookies&quot;), or by third parties, such as those who serve
              content or provide advertising or analytics services on the
              website (&quot;third party cookies&quot;). These third parties can
              recognize you when you visit our website and also when you visit
              certain other websites.
            </p>
            <h2>What type of cookies do we use?</h2>
            <h3>Advertising cookies</h3>
            <p>
              Advertising cookies allow us and third parties serve relevant ads
              to you more effectively and help us collect aggregated audit data,
              research, and performance reporting for advertisers. They also
              enable us to understand and improve the delivery of ads to you and
              know when certain ads have been shown to you.
            </p>
            <p>
              Your web browser may request advertisements directly from ad
              network servers, these networks can view, edit, or set their own
              cookies, just as if you had requested a web page from their
              website.
            </p>
            <p>
              Although we do not use cookies to create a profile of your
              browsing behavior on third-party sites, we do use aggregate data
              from third parties to show you relevant, interest-based
              advertising.
            </p>
            <h2>Do we use web beacons or tracking pixels?</h2>
            <p>
              Our emails may contain a &quot;web beacon&quot; (or &quot;tracking
              pixel&quot;) to tell us whether our emails are opened and verify
              any clicks through to links or advertisements within the email.
            </p>
            <p>
              We may use this information for purposes including determining
              which of our emails are more interesting to users and to query
              whether users who do not open our emails wish to continue
              receiving them.
            </p>
            <p>
              The pixel will be deleted when you delete the email. If you do not
              wish the pixel to be downloaded to your device, you should read
              the email in plain text view or with images disabled.
            </p>
            <h2>What are your cookie options?</h2>
            <p>
              If you don't like the idea of cookies or certain types of cookies,
              you can change your browser's settings to delete cookies that have
              already been set and to not accept new cookies. To learn more
              about how to do this or to learn more about cookies, visit{" "}
              <a target="_blank" href="https://www.internetcookies.org">
                internetcookies.org
              </a>
            </p>
            <h2>Changes and amendments</h2>
            <p>
              We reserve the right to modify this Policy relating to the Website
              or Services at any time, effective upon posting of an updated
              version of this Policy on the Website. When we do we will revise
              the updated date at the bottom of this page. Continued use of the
              Website after any such changes shall constitute your consent to
              such changes.
            </p>
            <h2>Acceptance of this policy</h2>
            <p>
              You acknowledge that you have read this Policy and agree to all
              its terms and conditions. By using the Website or its Services you
              agree to be bound by this Policy. If you do not agree to abide by
              the terms of this Policy, you are not authorized to use or access
              the Website and its Services.
            </p>
            <h2>Contacting us</h2>
            <p>
              If you would like to contact us to understand more about this
              Policy or wish to contact us concerning any matter relating to our
              use of cookies, you may send an <Email /> (click the link to
              obtain email address).
            </p>
            <p>This document was last updated on November 22, 2019</p>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};
