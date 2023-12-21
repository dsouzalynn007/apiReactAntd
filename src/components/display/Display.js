import React from "react";
import { Card, Image} from "antd";
import Meta from "antd/es/card/Meta";
import './Display.css'

const Display=({Data,title,description,src,alt,index})=>{

    return (
      <>
        <Card
            className="antdCard"
            key={index}
            hoverable
        >
            <Meta 
                className="metaTag"
                title={title}
                description={description}
            />
            <Image
                height={100}
                src={src}
                alt={alt}
                preview={false}
            />
        </Card>
      </>
  
    );
  }

export default Display