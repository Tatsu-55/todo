import {db} from '../Firebase';
import {collection, addDoc, serverTimestamp} from 'firebase/firestore';
//MUI
import { Button, Container, Stack, TextField } from '@mui/material'
import { useForm, Controller } from "react-hook-form";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** @jsxImportSource @emotion/react */

//Todoを追加する
export default function TodoForm() {

 //useFormで必要な関数を取得し、デフォルト値を指定します。
const { control, handleSubmit } = useForm({
    defaultValues: { text: "" },
});


 //サブミット時の処理を作成します。
const onSubmitAdd = async (data) => {

    await addDoc(collection(db, 'todos'), {
        text: data.text,
        createdAt: serverTimestamp(),
    });
    console.log(data.text);
};

 //検証ルールを指定します。
const validationRules = {
    text: {
        required: "入力してください",
        minLength: { value: 1, message: "1文字以上入力してください" },
    },
};

const Form = () => {
    return (
        <Container maxWidth="sm" sx={{pt: 5 }}>
            {/* 5. form要素のonSubmitに1.で取得しているhandleSubmitを指定します */}
            <Stack spacing={2} component="form" noValidate onSubmit={handleSubmit(onSubmitAdd)} >
                {/* 6. Controllerを使用して、TextfieldとReactHookFormを紐づけます */}
                <Typography sx={{ mt: 4, mb: 2 }} variant="h4" component="div">
            Your To-do List
          </Typography>
                <Controller
                    name="text"
                    control={control}
                    rules={validationRules.text}
                    render={({field, fieldState}) => (
                        <TextField
                            sx={{width: '100%', display: 'flex'}}
                            {...field}
                            label="Add To-do"
                            type="text"
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Button color="primary" type="submit" variant="contained" size="medium" sx={{ width: "150px" }}>Add</Button>
                </Box>
            </Stack>
           
        </Container>
    )
}

return(
    <div>
    <Form />
    </div>
);
};
