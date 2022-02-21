import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAudio, faFilePdf, faFileText, faFileImage, faFileArchive, faFileCsv } from '@fortawesome/free-solid-svg-icons';
import { FunctionComponent } from "react";

const FaIcon = styled(FontAwesomeIcon)`
    //color: var(--primary-color);
    margin: 0 0.4em;
`;

const icons = {
    'img': () => <FaIcon icon={faFileImage} />,
    'txt': () => <FaIcon icon={faFileText} />,
    'pdf': () => <FaIcon icon={faFilePdf} />,
    'archive': () => <FaIcon icon={faFileArchive} />,
    'csv': () => <FaIcon icon={faFileCsv} />,
    'sound': () => <FaIcon icon={faFileAudio} />,
};

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    text-align: left;
    margin: 0.2em 0;
`;

const Path = styled.div`
    color: gray;
    margin: 0 0.2em;
    font-size: 0.7em;
`;

const Name = styled.div`
    margin: 0 0.2em;
`;

export type Props = {
    name: string;
    type: keyof typeof icons;
};

export const Result: FunctionComponent<Props> = ({name, type}) => { 
    const Icon = icons[type];
    return <Container>
        <Icon />
        <Name>{name}</Name>
        <Path>C:\Users\Chris\Documents</Path>
    </Container>;
}
