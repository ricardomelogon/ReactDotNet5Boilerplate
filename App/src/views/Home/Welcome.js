import React from "react";

// core components
import Container from "../../components/Grid/GridContainer.js";
import Item from "../../components/Grid/GridItem.js";

export default function Welcome() {
  return (
    <Container alignItems="center" justify="center" direction="column">
      <Item xs={12}>
        <h2>React App</h2>
        <div>
          <h5>Please select a menu item to start</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec luctus erat. Cras quis libero lacinia, pulvinar magna eu, suscipit lacus. Nullam suscipit ac diam quis faucibus. Aliquam fermentum ligula et pellentesque vestibulum. Etiam eget gravida nibh, eu ultrices sem. In at sapien eget massa luctus egestas in non lacus. Fusce in lorem ac est vulputate pretium a sodales ipsum. Vestibulum arcu dolor, auctor in magna vitae, varius tincidunt orci. Mauris eleifend est at ante porttitor posuere. Nullam augue tellus, scelerisque vel eleifend eget, tristique vel felis. Nulla lacus tortor, hendrerit id dictum auctor, lacinia eget nisl.</p>
        </div>
      </Item>
    </Container>
  );
}
