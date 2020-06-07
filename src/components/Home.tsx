import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';


interface IState {
    entries: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { entries: [] }
    }

    public componentDidMount(): void {
        axios.get(`https://music-release-api.herokuapp.com/entries/`).then(data => {
            this.setState({ entries: data.data })
        })
    }

    public deleteEntry(id: number) {
        axios.delete(`https://music-release-api.herokuapp.com/entries/${id}`).then(data => {
            const index = this.state.entries.findIndex(entry => entry.id === id);
            this.state.entries.splice(index, 1);
            this.props.history.push('/');
        })
    }

    public render() {
        const entries = this.state.entries;



        return (
           
                <div className="container">
                <div className="aside">
                <iframe src="https://open.spotify.com/embed/playlist/7nlBAoBPr3hZ0xDkAQpMF8" width="300" height="380"  allow="encrypted-media"></iframe>
                </div>
                    <div className="row">
                        <table className="sortable table table-bordered" id="usersTable">
                            <thead>
                                <tr>
                                    <th scope="col">Artist</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Date</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries && entries.map(entry =>
                                    <tr className="item" key={entry.id}>
                                        <td>{entry.artist}</td>
                                        <td>{entry.title}</td>
                                        <td>{entry.date}</td>
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link to={`edit/${entry.id}`} className="btn btn-sm btn-outline-secondary">Edit entry </Link>
                                                    <button className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteEntry(entry.id)}>Delete entry</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

           
        )
    }
}
