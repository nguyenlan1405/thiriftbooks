const { Fragment } = wp.element;

const ExtendedImage = {
  name: "core/image",

  Controls: (props) => {
    return (
      <Fragment>
        <props.BlockEdit {...props} />
      </Fragment>
    );
  },
};

export default ExtendedImage;