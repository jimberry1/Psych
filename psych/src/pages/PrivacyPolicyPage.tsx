import {
  ContainerStyles,
  GeneralFlexboxColumnDirection,
  GeneralPageSubTitle,
  GeneralPageTextBody,
} from '../styles/GeneralStyles';
import { motion } from 'framer-motion';
import { verticalFadeInVariants } from '../styles/Animations';

export interface PrivacyPolicyPageProps {}

const PrivacyPolicyPage: React.SFC<PrivacyPolicyPageProps> = () => {
  return (
    <motion.div
      key={10000000001}
      variants={verticalFadeInVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ staggerChildren: 0.5 }}
    >
      <ContainerStyles style={{ maxWidth: '80%', margin: 'auto' }}>
        <GeneralFlexboxColumnDirection>
          <GeneralPageSubTitle>What data do we collect?</GeneralPageSubTitle>
          <GeneralPageTextBody>
            This site collects the following personal identification
            information: name, email address
          </GeneralPageTextBody>
        </GeneralFlexboxColumnDirection>
        <GeneralFlexboxColumnDirection>
          <GeneralPageSubTitle>
            How do we collect your data?
          </GeneralPageSubTitle>
          <GeneralPageTextBody>
            Our site collects this data entirely from voluntary user submission
            during account creation. There is nothing under the hood trying to
            take your information and sell it.
          </GeneralPageTextBody>
        </GeneralFlexboxColumnDirection>
        <GeneralFlexboxColumnDirection>
          <GeneralPageSubTitle>How will we use your data?</GeneralPageSubTitle>
          <GeneralPageTextBody>
            This site uses your data entirely for the creation and management of
            games. We do not share your information with other third parties.
          </GeneralPageTextBody>
        </GeneralFlexboxColumnDirection>
        <GeneralFlexboxColumnDirection>
          <GeneralPageSubTitle>How do we store your data?</GeneralPageSubTitle>
          <GeneralPageTextBody>
            Our data storage is handled by Firebase, a noSQL database service
            managed by Google.
          </GeneralPageTextBody>
        </GeneralFlexboxColumnDirection>
        <GeneralFlexboxColumnDirection>
          <GeneralPageSubTitle>Marketing</GeneralPageSubTitle>
          <GeneralPageTextBody>
            No data submitted to us will be used in Marketing.
          </GeneralPageTextBody>
        </GeneralFlexboxColumnDirection>
        <GeneralFlexboxColumnDirection>
          <GeneralPageSubTitle>
            What are your data protection rights?
          </GeneralPageSubTitle>
          <GeneralPageTextBody>
            It is important that you are fully aware of all of your data
            protection rights. Every user is entitled to the following:
          </GeneralPageTextBody>
          <GeneralPageTextBody style={{ maxWidth: '60%', margin: 'auto' }}>
            The right to access – You have the right to request Our Company for
            copies of your personal data. We may charge you a small fee for this
            service.
          </GeneralPageTextBody>
          <GeneralPageTextBody style={{ maxWidth: '60%', margin: 'auto' }}>
            The right to rectification – You have the right to request that Our
            Company correct any information you believe is inaccurate. You also
            have the right to request Our Company to complete the information
            you believe is incomplete.
          </GeneralPageTextBody>
          <GeneralPageTextBody style={{ maxWidth: '60%', margin: 'auto' }}>
            The right to erasure – You have the right to request that Our
            Company erase your personal data, under certain conditions.
          </GeneralPageTextBody>
          <GeneralPageTextBody style={{ maxWidth: '60%', margin: 'auto' }}>
            The right to restrict processing – You have the right to request
            that Our Company restrict the processing of your personal data,
            under certain conditions.
          </GeneralPageTextBody>
          <GeneralPageTextBody style={{ maxWidth: '60%', margin: 'auto' }}>
            The right to object to processing – You have the right to object to
            Our Company’s processing of your personal data, under certain
            conditions.
          </GeneralPageTextBody>
          <GeneralPageTextBody style={{ maxWidth: '60%', margin: 'auto' }}>
            The right to data portability – You have the right to request that
            Our Company transfer the data that we have collected to another
            organization, or directly to you, under certain conditions.
          </GeneralPageTextBody>
        </GeneralFlexboxColumnDirection>
        <GeneralFlexboxColumnDirection>
          <GeneralPageSubTitle>Cookies</GeneralPageSubTitle>
          <GeneralPageTextBody>
            Cookies are text files placed on your computer to collect standard
            Internet log information and visitor behavior information. This site
            uses minimal cookies and only to prevent sign in occuring every page
            refresh, we do not use cookies to invade on your privacy or collect
            your data
          </GeneralPageTextBody>
        </GeneralFlexboxColumnDirection>
        <GeneralFlexboxColumnDirection>
          <GeneralPageSubTitle>How to manage cookies</GeneralPageSubTitle>
          <GeneralPageTextBody>
            You can set your browser not to accept cookies - this should not
            affect the performance or usability of our site as we do not use
            cookies as a key part of any functionality.
          </GeneralPageTextBody>
        </GeneralFlexboxColumnDirection>
        <GeneralFlexboxColumnDirection>
          <GeneralPageSubTitle>How to contact us</GeneralPageSubTitle>
          <GeneralPageTextBody>
            If you have any questions about our privacy policy, the data we hold
            on you, or you would like to exercise one of your data protection
            rights, please do not hesitate to contact us.
          </GeneralPageTextBody>
          <GeneralPageTextBody>
            email: jimalexberry@gmail.com
          </GeneralPageTextBody>
        </GeneralFlexboxColumnDirection>
      </ContainerStyles>
    </motion.div>
  );
};

export default PrivacyPolicyPage;
