import React, { Component } from "react";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import { getImageListRequest } from "../store";
// import AOS from "aos";
// import "aos/dist/aos.css";

import "../styles.scss";

class Home extends Component {
	getImageList = () => {
		const { dispatch } = this.props;
		dispatch(getImageListRequest());
	};
	componentDidMount() {
		this.getImageList();
	}

	render() {
		const { imageList } = this.props;
		return (
			<div>
				<nav className="navbar navbar-expand-sm fixed-top bg-dark navbar-dark text-white ">
					Flowers
				</nav>
				<div data-aos="fade-in" className="row no-gutters mt-5">
					{imageList.map(data => (
						<div
							key={data.id}
							className="col-md-4 col-lg-3 col-sm-6 col-12 mb-3 d-flex justify-content-center"
						>
							<div key={data.id} className="card" style={{ width: "18rem" }}>
								<LazyLoad height={200}>
									<img
										className="card-img-top"
										src={data.previewURL}
										alt="Card image cap"
									/>
								</LazyLoad>

								<div className="card-body">
									<h5 className="card-title">{data.tags}</h5>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { imageList } = state;
	return { imageList };
}

export default connect(mapStateToProps)(Home);
