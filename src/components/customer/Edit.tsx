import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    id: number,
    entry: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditCustomer extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            entry: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }

    public componentDidMount(): void {
        axios.get(`https://music-release-api.herokuapp.com/entries/${this.state.id}`).then(data => {
            this.setState({ entry: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`https://music-release-api.herokuapp.com/entries/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }


    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }

    public render() {
        const { submitSuccess, loading } = this.state;
        return (
             <div className="App">
                {this.state.entry &&
                        <div>
                            <div className="formwrapper">
                            <div className="editheading">
                                Edit Release 
                                </div>
                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Customer's details has been edited successfully </div>
                                )}

                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label className="editlabel" htmlFor="artist"> Artist </label>
                                        <input type="text" id="artist" defaultValue={this.state.entry.artist} onChange={(e) => this.handleInputChanges(e)} name="artist" className="form-control" placeholder="Enter Artist" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label className="editlabel" htmlFor="title"> Title </label>
                                        <input type="text" id="title" defaultValue={this.state.entry.title} onChange={(e) => this.handleInputChanges(e)} name="title" className="form-control" placeholder="Enter Title" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label className="editlabel" htmlFor="date"> Date </label>
                                        <input type="date" id="date" defaultValue={this.state.entry.date} onChange={(e) => this.handleInputChanges(e)} name="date" className="form-control" placeholder="Enter Release Date" />
                                    </div>

                                    <div className="form-group col-md-4 pull-right">
                                        <button className="createbutton" type="submit">
                                            Edit Release </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </form>
                            
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(EditCustomer)
