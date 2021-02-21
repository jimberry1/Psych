import { useState } from 'react';
import { GeneralBlueButtonStyles } from './styles/GeneralStyles';
import imageCompression from 'browser-image-compression';

export interface ProfilePictureUploadProps {}

const ProfilePictureUpload: React.SFC<ProfilePictureUploadProps> = () => {
  const [profilePicture, setProfilePicture]: any = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: any) => {
    console.log(e.target.files[0].type);
    if (
      e.target.files[0]?.type == 'image/png' ||
      e.target.files[0]?.type == 'image/jpeg'
    ) {
      setProfilePicture(e.target.files[0]);
      //   props.changedProfilePic(URL.createObjectURL(e.target.files[0]));
    } else {
      setError('Please select a file of type jpeg or png');
    }
  };

  const compressionFunction = async () => {
    console.log('Running compression');

    const imageFile: any = profilePicture;
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 300,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      console.log(
        'compressedFile instanceof Blob',
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      setProfilePicture(compressedFile); // write your own logic
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e: any) => setProfilePicture(e.target.files[0])}
      />
      <GeneralBlueButtonStyles onClick={compressionFunction}>
        Run Compression function
      </GeneralBlueButtonStyles>
      <img
        src={URL.createObjectURL(profilePicture)}
        style={{ height: 100, width: 100 }}
        alt="No image uploaded..."
      />
    </div>
  );
};

export default ProfilePictureUpload;
