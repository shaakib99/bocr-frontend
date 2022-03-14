import type { NextPage } from "next";
import CanvasDraw from "react-canvas-draw";
import { DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Button, Spin } from "antd";

import { useWindowResize } from "../hooks/window-resize";
import { base64ToPng } from "../utils/converters";
import dynamic from "next/dynamic";

const Layout = dynamic(() => import("../components/common/layout"));

const Home: NextPage = () => {
  const { width } = useWindowResize();
  const canvasRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      const base64Image = canvasRef.current.getDataURL();
      const imgFile = await base64ToPng(base64Image);
      console.log(imgFile);
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
