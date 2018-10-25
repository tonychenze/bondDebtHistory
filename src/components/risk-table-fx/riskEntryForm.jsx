import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import Utilisation from "./utilisation";
import limitService from "../../services/limitService";
class RiskEntryForm extends Form {
  state = {
    data: {
      limit: "",
      mrm: "",
      business: ""
    },
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

  doSubmit = () => {
    console.log("submitted");
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <div className="col-6 offset-3 risk-entry-information">
          {this.renderStaticRow("Description", data.description)}
          {this.renderStaticRow("Type", data.type)}
          {this.renderStaticRow(
            "Utilsation",
            <Utilisation utilisation={data.utilisation} breach={data.breach} />
          )}
          {this.renderStaticRow("Exposure", data.exposure)}
        </div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("limit", "Limit Value")}
          {this.renderInput("mrm", "MRM Owner")}
          {this.renderInput("business", "Business Owner")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default RiskEntryForm;
