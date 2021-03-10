import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { fetcher, useMutation, useQuery } from '../../../lib/graphql'
import { useFormik } from 'formik'
import Layout from '../../../components/layout'
import Title from '../../../components/Title'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import * as Yup from 'yup'

let id = ''

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
const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Por favor, informe pelo menos um nome com 3 caracteres.')
    .required('Por favor, informe um nome.'),
  slug: Yup.string()
    .min(3, 'Por favor, informe um slug para a categoria')
    .required('Por favor, informe um slug para a categoria.')
    .test(
      'is-unique',
      'Por favor, utilize outro slug. Este já está em uso.',
      async value => {
        const ret = await fetcher(
          JSON.stringify({
            query: `
                query{
                  getCategoryBySlug(slug:"${value}"){
                    id
                  }
                }
              `
          })
        )

        if (ret.errors) {
          return true
        }

        if (ret.data.getCategoryBySlug.id === id) {
          return true
        }

        return false
      }
    )
})

const Edit = () => {
  const router = useRouter()
  id = router.query.id
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
      const data = await updateCategory(category)
      if (data && !data.erros) {
        router.push('/categories')
      }
    },
    validationSchema: CategorySchema
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
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 p-12'>
            {updatedData && !!updatedData.erros && (
              <p className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative'>
                Ocorreu um erro ao salvar os dados.
              </p>
            )}
            <form onSubmit={form.handleSubmit}>
              <Input
                label='Nome da Categoria'
                placeholder='Preencha com o nome da categoria'
                value={form.values.name}
                onChange={form.handleChange}
                name='name'
                errorMessage={form.errors.name}
              />
              <Input
                label='Slug da Categoria'
                placeholder='Preencha com o nome da categoria'
                value={form.values.slug}
                onChange={form.handleChange}
                name='slug'
                helpText='Slug é utilizado para URLs amigáveis.'
                errorMessage={form.errors.slug}
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
