import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import limitService from "../../services/limitService";
class RiskEntryForm extends Form {
  state = {
    data: {},
    errors: {}
  };

  schema = {
    _id: Joi.any(),
    description: Joi.string().required(),
    type: Joi.string().required(),
    utilisation: Joi.number().required(),
    exposure: Joi.number().required(),
    limit: Joi.number().required(),
    mrm: Joi.string(),
    business: Joi.string(),
    tick: Joi.number()
      .required()
      .min(0)
      .max(100),
    breach: Joi.number()
      .required()
      .min(0)
      .max(10),
    currency: Joi.any(),
    unit: Joi.any()
  };

  async componentDidMount() {
    await this.populateEntry();
  }

  populateEntry = async () => {
    try {
      const currentId = this.props.match.params.id;
      if (currentId === "new") return;
      const entry = await limitService.getLimit(currentId);
      this.setState({ data: entry });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <form onSubmit={this.handleChange}>
          {this.renderStaticRow("Description", data.description)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default RiskEntryForm;
