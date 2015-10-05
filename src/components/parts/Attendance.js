import React, { Component, PropTypes } from 'react';

export default class Attendance extends Component {

  static propTypes = {
    audience: PropTypes.array
  };

	addMemberRow(member, index) {
  return (
      <tr key={ index }>
				<td>{ member.name }</td>
				<td>{ member.id }</td>
			</tr>
		);
	}

	render() {
  return (
			<div>
				<h2>Attendance - { this.props.audience.length }</h2>
				<table className="table table-stripped">
					<thead>
						<tr>
							<th>Audience Member</th>
							<th>Socket ID</th>
						</tr>
					</thead>
					<tbody>
						{ this.props.audience.map(this.addMemberRow.bind(this)) }
					</tbody>
				</table>
			</div>
		);
	}
}
