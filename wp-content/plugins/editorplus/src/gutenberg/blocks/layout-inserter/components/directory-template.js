import React from "react";
import { Card, CardBody, CardMedia } from "@wordpress/components";
const { Button } = wp.components;
const { replaceBlock } = wp.data.dispatch("core/block-editor");
const { createBlock, parse } = wp.blocks;

const { get } = lodash;

function DirectoryTemplate(props) {
  const { data, clientId } = props;

  const screenshot = get(
    data,
    "_embedded.wp:featuredmedia[0].media_details.sizes.full.source_url"
  );
  const template = get(data, "template");

  const applyTemplate = () => {
    // const parsedTemplate = parse(template)[0];

    console.log(`${template}`);

    // replaceBlock(
    //   clientId,
    //   createBlock(
    //     parsedTemplate["name"],
    //     parsedTemplate["attributes"],
    //     parsedTemplate["innerBlocks"]
    //   )
    // );
  };

  return (
    <Card className="ep-td-template">
      <CardMedia>
        <img src={screenshot} />
      </CardMedia>
      <div className="overlay"></div>
      <div className="actions">
        <Button isPrimary onClick={applyTemplate}>
          Import
        </Button>
      </div>
    </Card>
  );
}

export default DirectoryTemplate;
