import React from "react";
import { Card, CardActions, CardTitle } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

class CourseCard extends React.Component {
  render() {
    return (
      <Card>
        <CardTitle title={this.props.title} />
        <CardActions>
          <FlatButton onClick={this.props.removeCourse} label="Remove" />
        </CardActions>
      </Card>
    );
  }
}

export default CourseCard;
