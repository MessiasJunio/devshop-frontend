import React from 'react'
import Layout from '../../components/layout'
import Title from '../../components/Title'
import Button from '../../components/Button'
import { useMutation } from '../../lib/graphql'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import Input from '../../components/Input'

const CREATE_CATEGORY = `
    mutation createCategory ($name: String!, $slug: String!) {
      createCategory (input: {
        name: $name,
        slug: $slug
      }) {
        id
        name 
        slug
      }
    }
  `
const Index = () => {
  const router = useRouter()
  const [data, createCategory] = useMutation(CREATE_CATEGORY)
  const form = useFormik({
    initialValues: {
      name: '',
      slug: ''
    },
    onSubmit: async values => {
      await createCategory(values)
      router.push('/categories')
    }
  })
  return (
    <Layout>
      <Title>Criar nova categoria</Title>
      <div className='mt-8'></div>
      <div>
        <Button.LinkOutline href='/categories'>Voltar</Button.LinkOutline>
      </div>
      <div className='flex flex-col mt-8'>
        <div className='-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'>
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 p-12'>
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
              <Button>Criar categoria</Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Index
