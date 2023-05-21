<template>
	<div class="container mt-2">
		<form @submit.prevent="sendForm" v-if="!formDone">
			<app-progress class="mt-3" :current="fieldDone" :max="info.length" />
			<div class="mt-3">
				<app-field 
					v-for="field,i in info"
					:key="i"
					:label="field.label"
					:value="field.value"
					:valid="field.valid"
					@updated="onUpdate(i, $event)"
				></app-field>
			</div>
			<button class="btn btn-primary mt-3" :disabled="!formReady">
				Send Data
			</button>

		</form>
		<div v-else>
			<h2>All Done!</h2>
		</div>

		<vue-final-modal v-model="showModal">
			<div class="container p-3 modal-table">
				<table class="table table-bordered">
					<tbody>
						<tr v-for="field,i in info" :key="i">
							<td>{{ field.label }}</td>
							<td>{{ field.value }}</td>
						</tr>
					</tbody>
				</table>
				<hr>
				<button class="btn btn-danger" @click="showModal = false">
					Cancel
				</button>
				<button class="btn btn-success" @click="onConfirm">
					OK
				</button>
			</div>
		</vue-final-modal>
	</div>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal'
import AppField from './components/Field'
import AppProgress from './components/Progress'


export default {
	components: { AppField, AppProgress, VueFinalModal },
	data: () => ({
		info: [
			{
				label: 'Name',
				value: '',
				pattern: /^[a-zA-Z ]{2,30}$/
			},
			{
				label: 'Phone',
				value: '',
				pattern: /^[0-9]{7,14}$/
			},
			{
				label: 'Email',
				value: '',
				pattern: /.+/
			},
			{
				label: 'Some Field 1',
				value: '',
				pattern: /.+/
			},
			{
				label: 'Some Field 2',
				value: '',
				pattern: /.+/
			}
		],
		showModal: false,
		formDone: false
	}),
	computed: {
		fieldDone(){
			// return this.info.reduce((total, field) => total + (field.valid ? 1 : 0), 0)
			return this.info.filter(field => field.valid).length;
		},
		formReady(){
			return this.fieldDone >= this.info.length;
		},
		progressStyles(){
			let rel = this.fieldDone / this.info.length * 100;
			return { width: rel + '%' };
		}
	},
	methods: {
		onUpdate(i, val){
			let field = this.info[i];
			field.value = val.trim();
			field.valid = field.pattern.test(field.value);
		},
		sendForm(){
			if(this.formReady){
				this.showModal = true;
			}
		},
		onConfirm() {
			this.formDone = true;
			this.showModal = false;
		}
	},
	created(){
		this.info.forEach(field => {
			field.valid = false;
		})
	}
}
</script>
<style>
	.modal-table {
		background-color: white;
	}
</style>