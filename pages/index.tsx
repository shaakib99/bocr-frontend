import type { NextPage } from "next";
import CanvasDraw from "react-canvas-draw";
import { DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Button, message, Modal, Spin, Typography } from "antd";
import dynamic from "next/dynamic";

import { useWindowResize } from "../hooks/window-resize";
import { base64ToPng } from "../utils/converters";
import { ImageRecognitionSerivces } from "../api/services";

const Layout = dynamic(() => import("../components/common/layout"));

const { Text } = Typography;
const Home: NextPage = () => {
  const { width } = useWindowResize();
  const canvasRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imgRecServices = new ImageRecognitionSerivces();

  useEffect(() => {
    clearCanvas();
  }, [width]);

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const handleConversion = async () => {
    if (canvasRef.current) {
      setIsLoading(true);

      const base64Image = canvasRef.current.getDataURL();
      const imgFile = await base64ToPng(base64Image);
      convertImgToWord(imgFile);
    }
  };

  const convertImgToWord = async (img: File) => {
    const formData = new FormData();
    formData.append("images", img);
    try {
      const resp = await imgRecServices.recognizeImage(formData);
      if (resp && resp.status === 200) {
        message.success("Succefully converted.", 4);
        Modal.info({
          title: "Converted Text",
          okText: "Ok",
          content: <Text code>{JSON.stringify(resp.data, null, 2)}</Text>,
        });
      }
    } catch (err: any) {
      message.error(err.message || "Failed to convert.", 4);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full p-2 flex flex-col items-center">
        <h2 className="text-2xl text-teal-400 p-2">
          Write Bangla word below...
        </h2>
        <div className="space-x-4 p-2">
          <Button
            icon={<FileSearchOutlined />}
            type="primary"
            title="Convert"
            size="large"
            onClick={handleConversion}
            disabled={isLoading}
          >
            Convert
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            title="Clear"
            size="large"
            onClick={clearCanvas}
            disabled={isLoading}
            danger
          >
            Clear Canvas{" "}
          </Button>
        </div>
        <div className="w-full border-2 border-gray-100 shadow-md">
          <Spin spinning={isLoading}>
            <CanvasDraw
              canvasWidth={width ? width - 20 : 400}
              hideGrid
              ref={canvasRef}
              backgroundColor="bg-gray-600"
              brushRadius={6}
              lazyRadius={10}
            />
          </Spin>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
