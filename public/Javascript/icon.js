const categorySelect = document.getElementById('category-select')
const categoryForm = document.getElementById('select-form')

categorySelect.addEventListener('change', () => {
  categoryForm.submit()
})
