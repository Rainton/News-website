import React from "react";
import AsyncSelect from "react-select/async";
import {withRouter} from "react-router-dom";
import {debounce} from "throttle-debounce";

class SelectBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {options: {}, value: ""};
        this.loadOptions = debounce(1000, this.loadOptions);
    }

    loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            fetch(
                "https://yutong-li.cognitiveservices.azure.com/bing/v7.0/suggestions?mkt=en-US&q=" + this.state.inputValue, {
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'a42b6d1b1fad47d7b33425d7eea2f04f'
                    }
                }).then(res => {
                return res.json();
            }).then((res) => {
                let suggestions = [];
                if ("suggestionGroups" in res) {
                    var resfilter = res["suggestionGroups"][0]["searchSuggestions"];
                    for (var i = 0; i < resfilter.length; i++) {
                        let val = resfilter[i]["displayText"];
                        suggestions.push({value: val, label: val});
                    }
                }
                callback(suggestions);
            });
        });
    };

    handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        this.setState({inputValue});
        return inputValue;
    };

    handleChange = (q) => {
        console.log(q.value);
        let queryString = "q=" + q.value;
        this.props.history.push('/search?' + queryString);
        this.setState({value: q});
    };

    componentDidMount() {
        this.props.history.listen(route => {
            if (route.pathname !== "/search") {
                this.setState({value: null});
            }
        })
    }

    render() {
        return (
            <AsyncSelect
                placeholder="Enter keyword .."
                className="selectBar"
                onInputChange={this.handleInputChange}
                loadOptions={this.loadOptions}
                onChange={this.handleChange}
                noOptionsMessage={() => {
                    return "No Match";
                }}
                value={this.state.value}
            />
        );
    }
}

export default withRouter(SelectBar);
