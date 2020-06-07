import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';


export interface IValues {
    Artist: string,
    Title: string,
    Date: string,
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            Artist: '',
            Title: '',
            Date: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });

        const formData = {
            Artist: this.state.artist,
            Title: this.state.title,
            Date: this.state.date,
        }

        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

        axios.post(`https://music-release-api.herokuapp.com/entries/`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="formwrapper">
                <div>
                
                    {!submitSuccess && (
                        <div className="addformheading" role="alert">
                            Add a Release
                    </div>
                    )}

                    {submitSuccess && (
                        <div className="alert alert-info" role="alert">
                            The form was successfully submitted!
                            </div>
                    )}

                    <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        <div className="form-group col-md-12">
                            <label htmlFor="artist"> Arist </label>
                            <input type="text" id="artist" onChange={(e) => this.handleInputChanges(e)} name="artist" className="form-control" placeholder="Enter Artist" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="title"> Title </label>
                            <input type="text" id="title" onChange={(e) => this.handleInputChanges(e)} name="title" className="form-control" placeholder="Enter Release Date" />
                        </div>

                        <div className="form-group col-md-12">
                            <label htmlFor="date"> Release Date </label>
                            <input type="date" id="date" onChange={(e) => this.handleInputChanges(e)} name="date" className="form-control" placeholder="Enter Date" />
                        </div>


                        <div className="form-group col-md-4 pull-right">
                            <button className="createbutton" type="submit">
                                Add Release
              </button>
                            {loading &&
                                <span className="fa fa-circle-o-notch fa-spin" />
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create)
