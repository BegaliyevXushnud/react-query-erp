import { useState } from "react";
import { Upload as AntUpload } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import ImgCrop from "antd-img-crop";

type CustomUploadProps = UploadProps & {
  setFile: (file: any) => void;
};

const Upload = ({ setFile, ...props }: CustomUploadProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]); // fileList ni aniqlang

  // Upload komponenti
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList); // fileList'ni yangilang
    if (newFileList.length > 0) {
      setFile(newFileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  const beforeUpload = () => {
    return false;
  };

  return (
    <ImgCrop>
      <AntUpload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        beforeUpload={beforeUpload}
        {...props} // UploadProps'dan kelayotgan boshqa xususiyatlarni o'tkazing
      >
        {fileList.length < 1 && "+ Upload"}
      </AntUpload>
    </ImgCrop>
  );
};

export default Upload;
