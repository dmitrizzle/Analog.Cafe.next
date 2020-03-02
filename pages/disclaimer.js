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
    title: "Disclaimer",
  };

  return (
    <>
      <NextSeo title={seo.title} />
      <Main title={seo.title}>
        <ArticleWrapper>
          <HeaderLarge pageTitle={seo.title} />
          <ArticleSection>
            <p>
              This disclaimer (&quot;Disclaimer&quot;, &quot;Agreement&quot;) is
              an agreement between Website Operator (&quot;Website
              Operator&quot;, &quot;us&quot;, &quot;we&quot; or &quot;our&quot;)
              and you (&quot;User&quot;, &quot;you&quot; or &quot;your&quot;).
              This Disclaimer sets forth the general guidelines, terms and
              conditions of your use of the{" "}
              <Link to="https://www.analog.cafe">analog.cafe</Link> website and
              any of its products or services (collectively, &quot;Website&quot;
              or &quot;Services&quot;).
            </p>
            <h2>Representation</h2>
            <p>
              Any views or opinions represented in this Website belong solely to
              the Content creators and do not represent those of people,
              institutions or organizations that the Website Operator or
              creators may or may not be associated with in professional or
              personal capacity, unless explicitly stated. Any views or opinions
              are not intended to malign any religion, ethnic group, club,
              organization, company, or individual.
            </p>
            <h2>Content and postings</h2>
            <p>
              You may not modify, print or copy any part of the Website.
              Inclusion of any part of this Website in another work, whether in
              printed or electronic or another form or inclusion of any part of
              the Website in another website by embedding, framing or otherwise
              without the express permission of Website Operator is prohibited.{" "}
            </p>
            <p>
              You may submit comments for the Content available on the Website.
              By uploading or otherwise making available any information to
              Website Operator, you grant Website Operator the unlimited,
              perpetual right to distribute, display, publish, reproduce, reuse
              and copy the information contained therein. You may not
              impersonate any other person through the Website. You may not post
              content that is defamatory, fraudulent, obscene, threatening,
              invasive of another person’s privacy rights or that is otherwise
              unlawful. You may not post content that infringes on the
              intellectual property rights of any other person or entity. You
              may not post any content that includes any computer virus or other
              code designed to disrupt, damage, or limit the functioning of any
              computer software or hardware. By submitting or posting Content on
              the Website, you grant Website Operator the right to edit and, if
              necessary, remove any Content at any time and for any reason.
            </p>
            <h2>Compensation</h2>
            <p>
              This Website accepts forms of advertising, sponsorship, paid
              insertions or other forms of compensation. Website Operator is
              compensated to provide opinion on products, services, websites and
              various other topics. Even though Website Operator receives
              compensation for our posts or advertisements, we always give our
              honest opinions, findings, beliefs, or experiences on those topics
              or products. The views and opinions expressed on the Website are
              purely of Website Operator. Any product claim, statistic, quote or
              other representation about a product or service should be verified
              with the manufacturer, provider or party in question. Sponsored
              content, advertising space or post will always be identified as
              such. Some of the links on the Website may be &quot;affiliate
              links&quot;. This means if you click on the link and purchase an
              item, Website Operator will receive an affiliate commission.
            </p>
            <h2>Indemnification and warranties</h2>
            <p>
              While we have made every attempt to ensure that the information
              contained on the Website is correct, Website Operator is not
              responsible for any errors or omissions, or for the results
              obtained from the use of this information. All information on the
              Website is provided &quot;as is&quot;, with no guarantee of
              completeness, accuracy, timeliness or of the results obtained from
              the use of this information, and without warranty of any kind,
              express or implied. In no event will Website Operator, or its
              partners, employees or agents, be liable to you or anyone else for
              any decision made or action taken in reliance on the information
              on the Website or for any consequential, special or similar
              damages, even if advised of the possibility of such damages.
              Information on the Website is for general information purposes
              only and is not intended to provide legal, financial, medical, or
              any other type of professional advice. Please seek professional
              assistance should you require it. Furthermore, information
              contained on the Website and any pages linked to and from it are
              subject to change at any time and without warning.
            </p>
            <p>
              We reserve the right to modify this Disclaimer relating to the
              Website or Services at any time, effective upon posting of an
              updated version of this Disclaimer on the Website. When we do we
              will revise the updated date at the bottom of this page. Continued
              use of the Website after any such changes shall constitute your
              consent to such changes.
            </p>
            <h2>Acceptance of this disclaimer</h2>
            <p>
              You acknowledge that you have read this Disclaimer and agree to
              all its terms and conditions. By accessing the Website you agree
              to be bound by this Disclaimer. If you do not agree to abide by
              the terms of this Disclaimer, you are not authorized to use or
              access the Website.
            </p>
            <h2>Contacting us</h2>
            <p>
              If you would like to contact us to understand more about this
              Disclaimer or wish to contact us concerning any matter relating to
              it, you may send an <Email /> (click the link to obtain email
              address).
            </p>
            <p>This document was last updated on November 22, 2019</p>
          </ArticleSection>
        </ArticleWrapper>
      </Main>
    </>
  );
};
