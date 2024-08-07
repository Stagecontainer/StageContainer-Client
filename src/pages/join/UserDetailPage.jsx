import styled from "styled-components";
import theme from "../../styles/theme"
import { Container, Form, JoinInput, PasswordToggle, InputWrap } from "../../styles/components/loginjoin/LoginJoinPage";
import LoginJoinButton from "../../components/form/LoginJoinButton";
import Progress from "../../components/form/Progress";
import { ButtonWrapper } from "../../styles/components/loginjoin/LoginJoinButton";
import Label from "../../components/form/Label"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EyeOff from "../../assets/icon/eyeoff-icon.svg?react";
import EyeOn from "../../assets/icon/eye-icon.svg?react";
import postSignup from "../../api/users"


const UserDetailPage = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [repw, setRepw] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [validId, setvalidId] = useState(false);
    const [isShowPassword, setShowPassword] = useState(
        {
            password: false,
            confirmPassword: false
        }
    );

    const clearInput = () => {
        setId('');
        setPw('');
        setRepw('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setvalidId(false);
        try {
            const user = {
                nickname: id,
                password: pw
            }
            const res = await postSignup(user);
            if (res.status === 201) {
                navigate('/join/success')
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setvalidId(true);
                        break;
                    default:
                        clearInput();
                        alert('회원가입에 실패했습니다.');
                }
            }
        }
    }
    const PasswordVisibility = (key) => {
        setShowPassword((prev) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    useEffect(() => {
        const allFieldsFilled = id !== '' && pw !== '' && repw !== '';
        const PasswordMatch = pw === repw;

        setIsFormValid(allFieldsFilled && PasswordMatch);
    }, [ id, pw, repw]);


    return (
        <Container>
            <Form onSubmit={handleSubmit}>

                <div className="title">회원가입</div>
                <Progress currentStep={"user"} />
                <div style={{ margin: "48px 85px 48px 85px" }}>
                
                    <Label label={"아이디"} valid={validId}>
                        <div style={{ height: "8px" }} />
                        <JoinInput
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="아이디를 입력해주세요" />
                    </Label>

                    <Label label={"비밀번호"}>
                        <div style={{ height: "8px" }} />
                        <InputWrap>
                            <JoinInput
                                type={isShowPassword.password ? "text" : "password"}
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                placeholder="비밀번호를 입력해주세요" />
                            <PasswordToggle onClick={() => PasswordVisibility('password')}>
                                {isShowPassword.password ? <EyeOn /> : <EyeOff />}
                            </PasswordToggle>
                        </InputWrap>
                    </Label>

                    <Label label={"비밀번호 확인"}>
                        <div style={{ height: "8px" }} />
                        <InputWrap>
                            <JoinInput
                                type={isShowPassword.confirmPassword ? "text" : "password"}
                                value={repw}
                                onChange={(e) => setRepw(e.target.value)}
                                placeholder="비밀번호를 한번 더 입력해주세요"

                            />
                            <PasswordToggle onClick={() => PasswordVisibility('confirmPassword')}>
                                {isShowPassword.confirmPassword ? <EyeOn /> : <EyeOff />}
                            </PasswordToggle>
                        </InputWrap>
                    </Label>

                </div>

                <ButtonWrapper>
                    <LoginJoinButton
                        text={"다음 단계"}
                        textColor={theme.color.gray0}
                        bgColor={theme.color.main}
                        isDisabled={!isFormValid}
                        onClick={handleSubmit}
                        type="submit"
                    />
                </ButtonWrapper>
            </Form>
        </Container>


    );
};

export default UserDetailPage;