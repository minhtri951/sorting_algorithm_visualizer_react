import React, { Component } from 'react';
import { initList, swap, sleep } from './function'

class App extends Component {

	constructor(props) {
		super(props)
		// Init default values
		this.algorithms = [
			'Bubble sort',
			'Insertion sort',
			'Selection sort',
			'Heap sort',
			'Merge sort',
			'Quick sort',
		]
		this.defaultSpeed = 0
		this.defaultNumber = 50
		const list = initList(this.defaultNumber)
		this.state = {
			algorithm: 'Bubble sort',
			number: this.defaultNumber,
			speed: this.defaultSpeed,
			originList: list.map(elm => { return { ...elm } }),
			list,
			isShowValue: true,
		}
		this.onChangAlgorithm = this.onChangAlgorithm.bind(this)
		this.onSort = this.onSort.bind(this)
		this.onStop = this.onStop.bind(this)
		this.compare = this.compare.bind(this)
		this.swap = this.swap.bind(this)
		this.done = this.done.bind(this)
		this.onChangeSpeed = this.onChangeSpeed.bind(this)
		this.onChangeNumber = this.onChangeNumber.bind(this)
		this.onGenerate = this.onGenerate.bind(this)
		this.onToggleShowValue = this.onToggleShowValue.bind(this)
		this.onResore = this.onResore.bind(this)
		this.keep = this.keep.bind(this)
		this.move = this.move.bind(this)
	}
	// <-- Common 
	onChangAlgorithm(e) {
		const { value } = e.target
		this.setState({ algorithm: value })
	}

	async onSort(algorithm) {
		switch (algorithm) {
			case this.algorithms[0]: {
				await this.onBubbleSort()
				break;
			}
			case this.algorithms[1]: {
				await this.onInsertionSort()
				break;
			}
			case this.algorithms[2]: {
				await this.onSelectionSort()
				break;
			}
			case this.algorithms[3]: {
				await this.onHeapSort()
				break;
			}
			case this.algorithms[4]: {
				await this.onMergeSort()
				break;
			}
			case this.algorithms[5]: {
				await this.onQuickSort()
				break;
			}
		}
	}

	onStop() {
		this.setState({
			isSorting: false,
		})
	}

	async onChangeSpeed(e) {
		let speed = e.target.value
		if (isNaN(speed)) return
		// if (speed <= 0) speed = 1
		this.setState({ speed })
	}

	async onChangeNumber(e) {
		const number = e.target.value
		if (isNaN(number)) return
		const list = initList(number === '' ? this.defaultNumber : number)
		this.setState({
			number,
			originList: list.map(elm => { return { ...elm } }),
			list,
			isSorted: false,
			isShowValue: number <= 100
		})
	}

	onGenerate() {
		const list = initList(this.state.list.length)
		this.setState({
			originList: list.map(elm => { return { ...elm } }),
			list,
			isSorted: false
		})
	}

	onToggleShowValue() {
		this.setState({
			isShowValue: !this.state.isShowValue
		})
	}

	onResore() {
		this.setState({
			list: this.state.originList.map(elm => { return { ...elm } }),
			isSorted: false
		})
	}

	// --> Common 

	// <-- Bubble sort
	async compare(x, y) {
		let { list, speed } = this.state
		if (speed === '') speed = this.defaultSpeed
		// Blue state
		list[x].color = 'blue'
		list[y].color = 'blue'
		this.setState({ list })
		await sleep(speed * 1000)
		// Normal state
		list[x].color = 'gray'
		list[y].color = 'gray'
		this.setState({ list })

	}

	async swap(x, y) {
		let { list, speed } = this.state
		if (speed === '') speed = this.defaultSpeed
		// Green state
		list[x].color = 'green'
		list[y].color = 'green'
		this.setState({ list })
		await sleep(speed * 1000 / 2)
		// Swap
		swap(list, x, y)
		this.setState({ list })
		await sleep(speed * 1000 / 2)
		// Normal state
		list[x].color = 'gray'
		list[y].color = 'gray'
		this.setState({ list })

	}

	done(x, n = x) {
		const { list } = this.state
		// Yellow state
		for (let i = x; i <= n; i++) {
			list[i].color = 'yellow'
			this.setState({ list })
		}

	}

	// Normal bubble sort algorithm
	// async onSort() {
	// 	// Start sort
	// 	this.setState({ isSorting: true }, async () => {

	// 		// Sort
	// 		const { list, originList } = this.state
	// 		const n = list.length
	// 		for (let i = 0; i < n - 1; i++) {
	// 			for (let j = 0; j < n - 1 - i; j++) {
	// 				await this.compare(j, j + 1)
	// 				// Stop
	// 				if (!this.state.isSorting) {
	// 					this.setState({
	// 						list: originList.map(elm => { return { ...elm } }),
	// 					})
	// 					return
	// 				}
	// 				// -->
	// 				if (list[j].value > list[j + 1].value) {
	// 					await this.swap(j, j + 1)
	// 				}

	// 			}
	// 			await this.done(n - 1 - i)
	// 			if (n - 1 - i === 1) {
	// 				await this.done(0)
	// 				// End sort
	// 				this.setState({ isSorting: false })
	// 			}
	// 		}
	// 	})
	// }

	// Enhanced bubble sort algorithm
	async onBubbleSort() {
		// Start sort
		this.setState({ isSorting: true }, async () => {
			// Sort
			const { list, originList } = this.state
			const n = list.length

			let isSwapped
			let i = 1
			do {
				isSwapped = false;
				for (let j = 0; j < n - i; j++) {
					await this.compare(j, j + 1)
					// Stop
					if (!this.state.isSorting) {
						this.setState({
							list: originList.map(elm => { return { ...elm } }),
						})
						return
					}
					// -->
					if (list[j].value > list[j + 1].value) {
						isSwapped = true
						await this.swap(j, j + 1)
					}
				}
				this.done(n - i)
				if (!isSwapped) {
					this.done(0, n - i - 1)
					// End sort
					this.setState({ isSorting: false, isSorted: true })
				}

				i++;
			}
			while (isSwapped === true)
		})
	}
	// --> Bubble sort

	// <-- Insertion sort
	async keep(x) {
		let { list, speed } = this.state
		if (speed === '') speed = this.defaultSpeed
		// Green state
		list[x].color = 'blue'
		this.setState({ list })
		await sleep(speed * 1000 / 2)
		// Normal state
		list[x].color = 'white'
		this.setState({ list })
		await sleep(speed * 1000 / 2)

	}

	async move(x, y) {
		let { list, speed } = this.state
		if (speed === '') speed = this.defaultSpeed
		// Green state
		list[x].color = 'green'
		this.setState({ list })
		await sleep(speed * 1000 / 2)
		// Move
		list[y].value = list[x].value
		list[y].color = list[x].color
		list[x].color = 'white'
		this.setState({ list })
		await sleep(speed * 1000 / 2)
		// Normal state
		list[y].color = 'gray'
		this.setState({ list })
	}

	async setBack(x) {
		let { list, speed } = this.state
		if (speed === '') speed = this.defaultSpeed
		// Yellow state
		list[x].color = 'yellow'
		this.setState({ list })
		await sleep(speed * 1000 / 2)
		// Normal state
		list[x].color = 'gray'
		this.setState({ list })

	}

	async onInsertionSort() {
		// Start sort
		this.setState({ isSorting: true }, async () => {
			// Sort
			const { list, originList } = this.state
			const n = list.length

			for (let i = 1; i < n; i++) {
				// Keep consider element (key)
				await this.keep(i)
				const key = list[i].value
				// Stop listener
				if (!this.state.isSorting) {
					this.setState({
						list: originList.map(elm => { return { ...elm } }),
					})
					return
				}
				// -->
				// Move elements greater than key
				let j = i - 1
				while (j >= 0 && list[j].value > key) {
					await this.move(j, j + 1)

					j--
				}
				// Set back key
				list[j + 1].value = key
				await this.setBack(j + 1)
			}
			// End sort
			this.setState({ isSorting: false, isSorted: true })
		})
	}

	// --> Insertion sort

	// <-- Quick sort

	async chosePivot(x) {
		let { list, speed } = this.state
		if (speed === '') speed = this.defaultSpeed
		list[x].color = 'pink'
		this.setState({ list })
		await sleep(speed * 1000)
	}

	async compareWithPivot(x) {
		let { list, speed } = this.state
		if (speed === '') speed = this.defaultSpeed
		list[x].color = 'blue'
		this.setState({ list })
		await sleep(speed * 1000)
		list[x].color = 'gray'
		this.setState({ list })
	}

	async onQuickSort() {
		// Start sort
		this.setState({ isSorting: true }, async () => {
			// Sort
			const { list } = this.state
			const n = list.length

			await this.quickSort(list, 0, n - 1)
			// End sort
			this.setState({
				isSorting: false,
				isSorted: !this.state.isCanceled,
				isCanceled: false
			})
		})

	}

	async quickSort(list, low, high) {
		if (low < high) { // Break condition of recursive
			const pi = await this.partion(list, low, high)
			await this.quickSort(list, low, pi - 1)
			await this.quickSort(list, pi + 1, high)
		}
	}

	async partion(list, low, high) {
		// Chose pivot
		await this.chosePivot(high)
		const pivot = list[high].value
		let i = low - 1
		for (let j = low; j <= high - 1; j++) {
			// Stop listener
			const { originList } = this.state
			if (!this.state.isSorting) {
				this.setState({
					list: originList.map(elm => { return { ...elm } }),
					isCanceled: true
				})
				return
			}
			// -->
			// Compare with pivot
			await this.compareWithPivot(j)
			if (list[j].value <= pivot) {
				i++
				// Swap
				await this.swap(i, j)
			}
		}
		// Swap
		await this.swap(i + 1, high)

		return i + 1
	}

	// --> Quick sort

	// <-- Heap sort
	async onHeapSort() {
		this.setState({ isSorting: true }, async () => {
			// Sort
			const { list } = this.state
			const n = list.length

			await this.heapSort(list, n)
			// End sort
			this.setState({
				isSorting: false,
				isSorted: !this.state.isCanceled,
				isCanceled: false
			})
		})

	}

	async heapSort(list, n) {
		// Build heap (rearrange array) 
		for (let i = Math.floor(n / 2 - 1); i >= 0; i--)
			await this.heapify(list, n, i);
		// One by one extract an element from heap 
		for (let i = n - 1; i > 0; i--) {
			// Move current root to end 
			await this.swap(0, i)
			// call max heapify on the reduced heap 
			await this.heapify(list, i, 0);
		}
	}

	async heapify(list, n, i) {
		let largest = i; // Initialize largest as root 
		let l = 2 * i + 1; // left = 2*i + 1 
		let r = 2 * i + 2; // right = 2*i + 2 
		// If left child is larger than root 
		if (l < n && list[l].value > list[largest].value)
			largest = l;
		// If right child is larger than largest so far 
		if (r < n && list[r].value > list[largest].value)
			largest = r;
		// If largest is not root 
		if (largest != i) {
			await this.swap(i, largest)
			// Recursively heapify the affected sub-tree 
			await this.heapify(list, n, largest);
		}
	}
	// --> Heap sort
	// <-- Merge sort

	async onMergeSort() {
		this.setState({ isSorting: true }, async () => {
			// Sort
			const { list } = this.state
			const n = list.length

			await this.mergeSort(list, 0, n - 1)
			// End sort
			this.setState({
				isSorting: false,
				isSorted: !this.state.isCanceled,
				isCanceled: false
			})
		})
	}
	/* l is for left index and r is right index of the 
	   sub-array of arr to be sorted */
	async mergeSort(list, l, r) {
		if (l < r) { // Break point of recursive
			// Same as (l+r)/2, but avoids overflow for large l and h 
			const m = l + Math.floor((r - l) / 2);
			// Sort first and second halves 
			await this.mergeSort(list, l, m);
			await this.mergeSort(list, m + 1, r);

			await this.merge(list, l, m, r);
		}
	}

	async merge(list, l, m, r) {
		let i, j, k;
		let n1 = m - l + 1;
		let n2 = r - m;

		/* create temp arrays */
		let L = new Array(n1), R = new Array(n2);

		/* Copy data to temp arrays L[] and R[] */
		for (i = 0; i < n1; i++)
			L[i] = list[l + i].value;
		for (j = 0; j < n2; j++)
			R[j] = list[m + 1 + j].value;

		/* Merge the temp arrays back into arr[l..r]*/
		i = 0; // Initial index of first subarray 
		j = 0; // Initial index of second subarray 
		k = l; // Initial index of merged subarray 
		while (i < n1 && j < n2) {
			if (L[i] <= R[j]) {
				list[k].value = L[i];
				i++;
			}
			else {
				list[k].value = R[j];
				j++;
			}
			k++;
		}

		/* Copy the remaining elements of L[], if there 
		   are any */
		while (i < n1) {
			list[k].value = L[i];
			i++;
			k++;
		}

		/* Copy the remaining elements of R[], if there 
		   are any */
		while (j < n2) {
			list[k].value = R[j];
			j++;
			k++;
		}
	}
	// --> Merge sort
	// <-- Selection sort



	async onSelectionSort() {
		this.setState({ isSorting: true }, async () => {
			// Sort
			const { list } = this.state
			const n = list.length

			let i, j, min_idx;
			// One by one move boundary of unsorted subarray  
			for (i = 0; i < n - 1; i++) {
				// Find the minimum element in unsorted array  
				min_idx = i;
				for (j = i + 1; j < n; j++) {
					// Stop listener
					const { originList } = this.state
					if (!this.state.isSorting) {
						this.setState({
							list: originList.map(elm => { return { ...elm } }),
						})
						return
					}
					// -->
					await this.compare(j, min_idx)
					if (list[j].value < list[min_idx].value)
						min_idx = j;
				}

				// Swap the found minimum element with the first element  
				await this.swap(min_idx, i);
				this.done(i)
			}
			this.done(n - 1)
			// End sort
			this.setState({
				isSorting: false,
				isSorted: true,
			})
		})
	}
	// --> Selection sort

	render() {
		const { algorithm, number, speed, list, isSorting, isShowValue, isSorted } = this.state
		return <React.Fragment>
			<div className='inline' style={{ marginRight: '30px' }}>Chose algorithm: </div>
			<select value={algorithm} onChange={this.onChangAlgorithm}>
				{this.algorithms.map((elm, i) => <option key={i}>{elm}</option>)}
			</select>

			<div className='center bold'>{algorithm.toUpperCase()} VISUALIZER</div><br />

			<div className='inline' style={{ marginRight: '30px' }}>Number of elements: <br /><input placeholder={this.defaultNumber} value={number} onChange={this.onChangeNumber} disabled={isSorting} /></div>
			<div>Re-generate elements (random):<br /><button onClick={this.onGenerate} disabled={isSorting} >Generate</button></div><br />
			<div className='inline' style={{ marginRight: '15px' }}>Speed of sorting (second/step): <br /><input placeholder={this.defaultSpeed} value={speed} onChange={this.onChangeSpeed} /></div>
			<div>Show value in columns:<br /><button onClick={this.onToggleShowValue} >{isShowValue ? 'Hide' : 'Show'}</button></div><br /><br />
			{isSorted ?
				<div><button className='bold' onClick={this.onResore}>Back</button></div>
				:
				(!isSorting ?
					<div><button className='bold' onClick={() => this.onSort(algorithm)}>Sort</button></div>
					:
					<div><button className='bold' onClick={this.onStop}>Calcel</button></div>
				)
			}

			<div className='list'>
				{list.map((elm, i) => <div key={i} className={'element ' + elm.color + ' ' + i} style={{ height: 6 * elm.value + 'px' }}>{isShowValue ? elm.value : ''}</div>)}
			</div>
			<div>
				<div className='inline'>Note of color states:</div>
				<div className='blue inline' style={{ height: '20px', width: '20px' }} /><div className='inline'>Compare</div>
				<div className='green inline' style={{ height: '20px', width: '20px' }} /><div className='inline'>Swap</div>
				<div className={'yellow inline'} style={{ height: '20px', width: '20px' }} /><div className='inline'>Done</div>
			</div>

		</React.Fragment >
	}
}

export default App;