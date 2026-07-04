<template>
  <form @submit.prevent="submit" class="flex flex-col gap-5">

    <!-- Top: 2-column layout -->
    <div class="grid grid-cols-3 gap-5">

      <!-- Left: Basic Info (2/3) -->
      <div class="col-span-2 flex flex-col gap-5">

        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <p class="text-[11px] uppercase tracking-wider font-semibold text-osloGrey mb-4">Basic Info</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="form-label">Product Name</label>
              <input v-model="form.name" @input="autoSlug" type="text" required class="form-input" placeholder="e.g. Swift Black" />
            </div>
            <div>
              <label class="form-label">Slug</label>
              <input v-model="form.slug" type="text" required class="form-input" placeholder="swift-black" />
            </div>
            <div>
              <label class="form-label">Price (Rs)</label>
              <input v-model.number="form.price" type="number" required min="0" class="form-input" placeholder="949" />
            </div>
            <div>
              <label class="form-label">Category</label>
              <select v-model="form.category" required class="form-input">
                <option value="">Select category</option>
                <option>Graphic</option>
                <option>Drop</option>
                <option>Basic</option>
              </select>
            </div>
            <div>
              <label class="form-label">Collection</label>
              <select v-model="form.collection" required class="form-input">
                <option value="">Select collection</option>
                <option>Pitch</option>
                <option>Aura</option>
                <option>NyctoPhille</option>
                <option>Restored</option>
              </select>
            </div>
            <div class="col-span-2">
              <label class="form-label">Description</label>
              <textarea v-model="form.description" class="form-input" rows="3" placeholder="100% Cotton | Round Neck Tee"></textarea>
            </div>
          </div>
        </div>

        <!-- Images -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <p class="text-[11px] uppercase tracking-wider font-semibold text-osloGrey mb-4">Images</p>
          <div class="grid grid-cols-2 gap-5">
            <div v-for="key in ['image', 'image2']" :key="key">
              <label class="form-label">{{ key === 'image' ? 'Main Image' : 'Secondary Image' }}</label>
              <div class="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center gap-3 hover:border-purplHeart/40 transition-colors">
                <img v-if="form[key]" :src="form[key]" class="w-full h-36 object-contain rounded-lg" @error="(e) => e.target.src = ''" />
                <div v-else class="w-full h-36 bg-gray-50 rounded-lg flex items-center justify-center">
                  <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
                <label class="cursor-pointer text-xs px-3 py-1.5 bg-gray-100 hover:bg-purplHeart hover:text-white text-codGrey rounded-lg transition-all font-medium">
                  {{ uploading[key] ? 'Uploading…' : '+ Upload' }}
                  <input type="file" accept="image/*" class="hidden" @change="(e) => uploadImage(e, key)" :disabled="uploading[key]" />
                </label>
                <p v-if="form[key]" class="text-[10px] text-osloGrey text-center break-all max-w-full leading-relaxed">{{ form[key] }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Colours -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <p class="text-[11px] uppercase tracking-wider font-semibold text-osloGrey mb-4">Available Colours</p>
          <div class="flex flex-col gap-3">
            <div v-for="(colour, idx) in form.available_colours" :key="idx" class="flex items-center gap-3">
              <input v-model="colour.slug" type="text" placeholder="slug (e.g. swift-black)" class="form-input flex-1" />
              <input type="color" v-model="colour.color" class="w-9 h-9 rounded-lg border border-gray-200 cursor-pointer p-0.5 shrink-0" />
              <span class="text-xs text-osloGrey w-16 shrink-0">{{ colour.color }}</span>
              <button type="button" @click="removeColour(idx)" class="text-xs text-red-400 hover:text-red-600 shrink-0">✕</button>
            </div>
            <button type="button" @click="addColour" class="text-xs text-purplHeart hover:underline w-fit">+ Add Colour</button>
          </div>
        </div>

      </div>

      <!-- Right: Flags + Sizes (1/3) -->
      <div class="flex flex-col gap-5">

        <!-- Flags -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <p class="text-[11px] uppercase tracking-wider font-semibold text-osloGrey mb-4">Flags</p>
          <div class="flex flex-col gap-4">
            <label v-for="flag in flags" :key="flag.key" class="flex items-center justify-between cursor-pointer">
              <span class="text-sm text-codGrey">{{ flag.label }}</span>
              <div
                @click="form[flag.key] = !form[flag.key]"
                :class="form[flag.key] ? 'bg-purplHeart' : 'bg-gray-200'"
                class="w-10 h-6 rounded-full relative transition-colors cursor-pointer shrink-0"
              >
                <span :class="form[flag.key] ? 'translate-x-5' : 'translate-x-1'" class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform block"></span>
              </div>
            </label>
          </div>
        </div>

        <!-- Sizes -->
        <div class="bg-white rounded-xl border border-gray-100 p-6">
          <p class="text-[11px] uppercase tracking-wider font-semibold text-osloGrey mb-4">Available Sizes</p>
          <div class="flex flex-wrap gap-2">
            <label v-for="size in allSizes" :key="size" class="cursor-pointer">
              <input type="checkbox" :value="size" v-model="form.available_size" class="hidden peer" />
              <span class="block px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-codGrey peer-checked:bg-codGrey peer-checked:text-white peer-checked:border-codGrey transition-all select-none">{{ size }}</span>
            </label>
          </div>
        </div>

        <!-- Error -->
        <p v-if="error" class="text-sm text-red-500 bg-red-50 px-4 py-3 rounded-lg">{{ error }}</p>

        <!-- Submit -->
        <div class="flex flex-col gap-2">
          <button
            type="submit"
            :disabled="saving"
            class="w-full py-2.5 bg-purplHeart text-white rounded-lg text-sm font-medium hover:bg-purplHeart/90 transition-all disabled:opacity-60"
          >
            {{ saving ? 'Saving…' : (isEdit ? 'Save Changes' : 'Create Product') }}
          </button>
          <NuxtLink to="/admin/products" class="w-full py-2.5 border border-gray-200 text-codGrey rounded-lg text-sm text-center hover:border-gray-400 transition-all">
            Cancel
          </NuxtLink>
        </div>

      </div>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  initial: { type: Object, default: null },
  isEdit: { type: Boolean, default: false }
})

const emit = defineEmits(['saved'])

const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const flags = [
  { key: 'is_new', label: 'New Arrival' },
  { key: 'is_bestseller', label: 'Bestseller' },
  { key: 'is_creator_selector', label: 'Creator Selector' },
  { key: 'is_out_of_stock', label: 'Out of Stock' },
]

const defaultForm = () => ({
  name: '',
  slug: '',
  price: 0,
  category: '',
  collection: '',
  description: '',
  image: '',
  image2: '',
  is_new: false,
  is_bestseller: false,
  is_creator_selector: false,
  is_out_of_stock: false,
  available_size: [],
  available_colours: []
})

const form = ref(props.initial ? { ...defaultForm(), ...props.initial } : defaultForm())
const saving = ref(false)
const error = ref('')
const uploading = ref({ image: false, image2: false })

watch(() => props.initial, (val) => {
  if (val) form.value = { ...defaultForm(), ...val }
}, { immediate: true })

const autoSlug = () => {
  if (!props.isEdit) {
    form.value.slug = form.value.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  }
}

const addColour = () => {
  form.value.available_colours.push({ slug: '', color: '#000000' })
}

const removeColour = (idx) => {
  form.value.available_colours.splice(idx, 1)
}

const uploadImage = async (event, field) => {
  const file = event.target.files?.[0]
  if (!file) return

  uploading.value[field] = true
  error.value = ''

  try {
    const category = form.value.category?.toLowerCase() || 'misc'
    const folder = category === 'graphic' ? 'summer/graphics'
      : category === 'drop' ? 'summer/drops'
      : category === 'basic' ? 'summer/basic'
      : 'misc'

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const { url } = await $fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    })

    form.value[field] = url
  } catch (err) {
    error.value = `Upload failed: ${err?.data?.statusMessage || err.message}`
  } finally {
    uploading.value[field] = false
  }
}

const submit = async () => {
  saving.value = true
  error.value = ''
  try {
    if (props.isEdit) {
      await $fetch(`/api/products/${form.value.slug}`, {
        method: 'PUT',
        body: form.value
      })
    } else {
      await $fetch('/api/products', {
        method: 'POST',
        body: form.value
      })
    }
    emit('saved', form.value.slug)
  } catch (err) {
    error.value = err?.data?.message || err.message || 'Something went wrong'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-codGrey mb-1.5;
}
.form-input {
  @apply w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-codGrey focus:outline-none focus:border-purplHeart transition-colors;
}
</style>
