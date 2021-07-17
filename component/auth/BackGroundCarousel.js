import React from 'react';
import { Text, View, SafeAreaView, Dimensions } from 'react-native';

import Carousel, { Pagination } from 'react-native-snap-carousel';
const sliderWidth = Dimensions.get('window').width;
const itemWidth = sliderWidth * 0.85;

class BackGroundCarousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 0,
			carouselItems: [
				{
					title: 'Item 1',
					text: 'Text 1'
				},
				{
					title: 'Item 2',
					text: 'Text 2'
				},
				{
					title: 'Item 3',
					text: 'Text 3'
				},
				{
					title: 'Item 4',
					text: 'Text 4'
				},
				{
					title: 'Item 5',
					text: 'Text 5'
				}
			]
		};
	}

	_renderItem({ item, index }) {
		return (
			<View
				style={{
					backgroundColor: '#EA1D2C',
					borderRadius: 5,
					flex: 1,
					padding: 40
				}}
			>
				<Text style={{ fontSize: 30 }}>{item.title}</Text>
				<Text>{item.text}</Text>
			</View>
		);
	}

	get pagination() {
		const { carouselItems, activeIndex } = this.state;
		return (
			<Pagination
				dotsLength={carouselItems.length}
				activeDotIndex={activeIndex}
				containerStyle={{ backgroundColor: '#fff', paddingVertical: 0, height: 30 }}
				dotStyle={{
					width: 7,
					height: 7,
					borderRadius: 5,
					marginHorizontal: 0,
					backgroundColor: '#3E3E3E'
				}}
				inactiveDotStyle={{
					// Define styles for inactive dots here
				}}
				inactiveDotOpacity={0.5}
				inactiveDotScale={0.6}
			/>
		);
	}

	render() {
		return (
			<View style={{ flex: 5 }}>
				<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
					<Carousel
						layout={'default'}
						ref={(ref) => (this.carousel = ref)}
						data={this.state.carouselItems}
						sliderWidth={sliderWidth}
						itemWidth={itemWidth}
						renderItem={this._renderItem}
						onSnapToItem={(index) => this.setState({ activeIndex: index })}
					/>
				</View>
				{this.pagination}
			</View>
		);
	}
}

export default BackGroundCarousel;
