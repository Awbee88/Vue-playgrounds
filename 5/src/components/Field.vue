<template>
	<div class="form-group">
		<label>
			{{ label }}
			<transition 
			appear
			appear-active-class="animate__animated animate__fadeIn"
			v-if="activated"
			name="icon"
			mode="out-in"
			>
				<fa-icon
					:key="valid"
					:class="valid ? 'text-success' : 'text-danger'"
					:icon="valid ? 'check-circle' : 'exclamation-circle'"
				/>
			</transition>
		</label>
		<input type="text" class="form-control" :value="value" @input="onInput">
	</div>
</template>

<script>
export default {
	props: {
		label: { type: String, required: true },
		value: { type: String, required: true },
		valid: { type: Boolean, required: true }
	},
	data(){
		return {
			activated: this.value != ''
		}
	},
	methods: {
		onInput(e){
			this.activated = true;
			this.$emit('updated', e.target.value)
		}
	}
}
</script>

<style>

	.icon-enter-active {
		animation: iconIn 0.3s;
	}
	.icon-leave-active {
		animation: iconOut 0.3s;
	}

	@keyframes iconIn {
		from {
			transform: rotateY(-90deg);
		}

		to {
			transform: rotateY(0);
		}
	}

	@keyframes iconOut {
		from {
			transform: rotateY(0);
		}

		to {
			transform: rotateY(90deg);
		}
	}
</style>