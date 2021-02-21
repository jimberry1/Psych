import { useState } from 'react';
import db, { storage } from './firebase';
import { GeneralBlueButtonStyles } from './styles/GeneralStyles';
import imageCompression from 'browser-image-compression';
import firebase from 'firebase';

export interface ProfilePictureUploadProps {
  userUid: string;
}

const ProfilePictureUpload: React.SFC<ProfilePictureUploadProps> = ({
  userUid,
}) => {
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
      maxSizeMB: 0.05,
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
      setProfilePicture(compressedFile);
      const storageRef = storage.ref(`profilePictures/${userUid}`);
      const uploadTask = storageRef.put(compressedFile);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        function progress(snapshot) {
          //   let progress =
          //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   setUploadProgress(progress);
        },
        function error(err) {
          console.log(err);
        },
        function complete() {
          console.log('Profile picture upload complete!');
          //   const batch = db.batch();
          storageRef
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              const usersRef = db.collection('users').doc(userUid);

              usersRef.set({ photoURL: url }, { merge: true });
            })
            .catch((err) => {
              setError(
                'An error occurred when uploading your new profile picture'
              );
              console.log(err);
            });
          //   batch.commit();
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (profilePicture) {
    console.log('my size is ' + profilePicture.size);
  }
  return (
    <div>
      <input
        type="file"
        onChange={(e: any) => setProfilePicture(e.target.files[0])}
      />
      <GeneralBlueButtonStyles onClick={compressionFunction}>
        Compress and send
      </GeneralBlueButtonStyles>
      <img
        src={profilePicture ? URL.createObjectURL(profilePicture) : 'none'}
        style={{ height: 100, width: 100, borderRadius: '50%' }}
        alt="No image uploaded..."
      />
    </div>
  );
};

export default ProfilePictureUpload;
