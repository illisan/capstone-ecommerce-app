import React, { Component } from 'react';

class ProductDetails extends Component {

    render() {


        let items = this.props.FeaturedItems
        return (
            <div>
                <h2>Title: {item.ItemAttributes[0].Title}</h2>
                {/* <p className="description">{songs[song.songId].description}</p>
                <button onClick={() => { this.props.playAudio([song.songId]) }}>{this.props.playing ? 'Pause' : 'Play'}</button> */}
            </div>
        )
    }
}

export default ProductDetails; 