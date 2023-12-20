import PropTypes from 'prop-types';

const ImageInput = ({ onUpload, savedImage }) => {
  const handleUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      onUpload(reader.result); // img into format base64
    };
  };

  return (
    <label className="tutorFormAvatarLabel">
      <img
        style={{ cursor: 'pointer ' }}
        src={savedImage}
        alt="University building"
        width="80"
        height="80"
      />

      <input
        style={{ display: 'none', cursor: 'pointer ' }}
        type="file"
        name="file"
        onChange={handleUpload}
      />
    </label>
  );
};

ImageInput.propTypes = {
  onUpload: PropTypes.func.isRequired,
  savedImage: PropTypes.string.isRequired,
};

export default ImageInput;
