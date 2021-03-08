import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '../../../lib/graphql'
import { useFormik } from 'formik'
import Layout from '../../../components/layout'
import Title from '../../../components/Title'
import Input from '../../../components/Input'
import Button from '../../../components/Button'

const UPDATE_CATEGORY = `
    mutation updateCategory ($id: String!, $name: String!, $slug: String!) {
      updateCategory (input: {
        id: $id,
        name: $name,
        slug: $slug
      }) {
        id
        name 
        slug
      }
    }
  `
const Edit = () => {
  const router = useRouter()
  const { data, mutate } = useQuery(`
    query {
      getCategoryById(id: "${router.query.id}") {
        name
        slug
      }
    }
  `)
  const [updatedData, updateCategory] = useMutation(UPDATE_CATEGORY)
  const form = useFormik({
    initialValues: {
      name: '',
      slug: ''
    },
    onSubmit: async values => {
      const category = {
        ...values,
        id: router.query.id
      }
      await updateCategory(category)
      router.push('/categories')
    }
  })

  // passou dados para o formulário
  useEffect(() => {
    if (data && data.getCategoryById) {
      form.setFieldValue('name', data.getCategoryById.name)
      form.setFieldValue('slug', data.getCategoryById.slug)
    }
  }, [data])

  return (
    <Layout>
      <Title>Editar nova categoria</Title>
      <div className='mt-8'></div>
      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div class='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 p-12'>
            <form onSubmit={form.handleSubmit}>
              <Input
                label='Nome da Categoria'
                placeholder='Preencha com o nome da categoria'
                value={form.values.name}
                onChange={form.handleChange}
                name='name'
              />
              <Input
                label='Slug da Categoria'
                placeholder='Preencha com o nome da categoria'
                value={form.values.slug}
                onChange={form.handleChange}
                name='slug'
                helpText='Slug é utilizado para URLs amigáveis.'
              />
              <Button>Salvar</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Edit
